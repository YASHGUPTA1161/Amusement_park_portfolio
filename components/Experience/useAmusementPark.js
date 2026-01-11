// components/Blender/useAmusementPark.js
"use client";

import { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

import { createScene } from "./scene.js";
import { createRenderer } from "./renderer.js";
import { createCamera } from "./camera.js";
import { loadAmusementPark } from "./loadAmusementPark.js";
import { setupLights } from "./lights.js";

import { createCharacterController } from "./characterController.js";
import { createGroundController } from "./groundController.js";
import { updateHover } from "./hoverController.js";
import { updateCameraFollow } from "./cameraFollow.js";
import { createModalController } from "./modalController.js";
import { modalContent } from "./data/modalContent.js";

export function useAmusementPark() {
  useEffect(() => {
    // ===== Core state =====
    const cameraOffset = new THREE.Vector3(8, 14, -3);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const interactables = [];
    let hovered = null;

    const character = {
      instance: null,
      isMoving: false,
      spawnPosition: new THREE.Vector3(),
    };

    const baseMesh = { current: null };

    // ===== Modal =====
    const modalController = createModalController(modalContent);
    modalController.bind();

    const handleGlobalClick = () => {
      modalController.handleClick(hovered);
    };
    window.addEventListener("click", handleGlobalClick);

    // ===== Pointer =====
    function onPointerMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("pointermove", onPointerMove);

    // ===== Scene =====
    const scene = createScene();
    setupLights(scene);

    const canvas = document.getElementById("experience-canvas");
    if (!canvas) return;

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const renderer = createRenderer(canvas, sizes);

    loadAmusementPark({
      scene,
      interactables,
      character,
      onBaseFound: (mesh) => {
        baseMesh.current = mesh;
      },
    });

    const { camera, controls } = createCamera(sizes, canvas);
    scene.add(camera);

    // ===== Resize =====
    function onResize() {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      const aspect = sizes.width / sizes.height;
      camera.left = -aspect * 50;
      camera.right = aspect * 50;
      camera.top = 50;
      camera.bottom = -50;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    window.addEventListener("resize", onResize);

    // ===== Respawn =====
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

    // ===== Controllers =====
    const groundController = createGroundController({
      character,
      raycaster,
      baseMesh,
      respawnCharacter,
    });

    const { handleKeyDown } = createCharacterController(
      character,
      respawnCharacter
    );
    window.addEventListener("keydown", handleKeyDown);

    // ===== Helpers =====
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

    // ===== Animation loop =====
    function animate() {
      controls.update();
      groundController.update();

      updateCameraFollow({
        camera,
        character,
        offset: cameraOffset,
      });

      hovered = updateHover({
        raycaster,
        mouse,
        camera,
        interactables,
        findRealObject,
        prevHovered: hovered,
      });

      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    // ===== Cleanup =====
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", handleGlobalClick);

      modalController.cleanup();
      renderer.dispose();
      renderer.setAnimationLoop(null);
    };
  }, []);
}
