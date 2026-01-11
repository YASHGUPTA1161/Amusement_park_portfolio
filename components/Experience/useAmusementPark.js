// components/Blender/useAmusementPark.js
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

import { loadAmusementPark } from "./loadAmusementPark.js";
import { createCharacterController } from "./characterController.js";
import { createGroundController } from "./groundController.js";
import { updateHover } from "./hoverController.js";
import { updateCameraFollow } from "./cameraFollow.js";
import { createModalController } from "./modalController.js";
import { modalContent } from "./data/modalContent.js";
import { createInputController } from "./inputController.js";
import { createStateController } from "./stateController.js";
import { useThreeSceneLifecycle } from "./useThreeSceneLifecycle";

export function useAmusementPark() {
  // ===== Persistent refs (shared with render loop) =====
  const stateRef = useRef(createStateController());
  const baseMeshRef = useRef(null);
  const interactablesRef = useRef([]);
  const characterRef = useRef({
    instance: null,
    isMoving: false,
    spawnPosition: new THREE.Vector3(),
  });

  const raycaster = useRef(new THREE.Raycaster()).current;
  const mouse = useRef(new THREE.Vector2()).current;
  const cameraOffset = useRef(new THREE.Vector3(8, 14, -3)).current;

  const modalControllerRef = useRef(null);
  const groundControllerRef = useRef(null);

  // =========================
  // 🔁 FRAME LOOP (HOOK)
  // =========================
  useThreeSceneLifecycle({
    onFrame: ({ scene, camera }) => {
      if (!baseMeshRef.current) {
        loadAmusementPark({
          scene,
          interactables: interactablesRef.current,
          character: characterRef.current,
          onBaseFound: (mesh) => {
            baseMeshRef.current = mesh;
          },
        });
      }

      groundControllerRef.current?.update();

      updateCameraFollow({
        camera,
        character: characterRef.current,
        offset: cameraOffset,
      });

      const hovered = updateHover({
        raycaster,
        mouse,
        camera,
        interactables: interactablesRef.current,
        findRealObject,
        prevHovered: stateRef.current.getHovered(),
      });

      hovered
        ? stateRef.current.setHovered(hovered)
        : stateRef.current.clearHovered();
    },
  });

  // =========================
  // 🧠 SETUP / CLEANUP
  // =========================
  useEffect(() => {
    const state = stateRef.current;
    const character = characterRef.current;

    modalControllerRef.current = createModalController(modalContent);
    modalControllerRef.current.bind();

    function respawnCharacter() {
      if (!character.instance) return;

      character.instance.position.copy(character.spawnPosition);
      character.instance.rotation.y = Math.PI / 2;
      character.isMoving = false;

      gsap.from(character.instance.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: "back.out(2)",
      });
    }

    const { handleKeyDown } = createCharacterController(
      character,
      respawnCharacter
    );

    groundControllerRef.current = createGroundController({
      character,
      raycaster,
      baseMesh: baseMeshRef,
      respawnCharacter,
    });

    const inputController = createInputController({
      onKeyDown: handleKeyDown,
      onPointerMove: (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      },
      onClick: () => {
        modalControllerRef.current.handleClick(state.getHovered());
      },
    });

    inputController.bind();

    return () => {
      inputController.cleanup();
      modalControllerRef.current.cleanup();
    };
  }, []);

  function findRealObject(mesh) {
    let obj = mesh;
    while (obj.parent) {
      if (obj.name && obj.name !== "base" && obj.name !== "Scene") {
        return obj;
      }
      obj = obj.parent;
    }
    return null;
  }
}
