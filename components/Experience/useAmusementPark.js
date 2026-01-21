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
import { createLoadingController } from "./loadingController.js";
import { modalContent } from "./data/modalContent.js";
import { createInputController } from "./inputController.js";
import { createStateController } from "./stateController.js";
import { useThreeSceneLifecycle } from "./useThreeSceneLifecycle";
import { createMovementAudio } from "./audio/movementAudio";
import { createBackgroundMusic } from "./audio/backgroundMusic.js";
import { createThemeController } from "./themeController.js";
import { createAudioController } from "./audioController.js";
import { createWindowController } from "./windowController.js";
import { createTouchController } from "./touchController.js";

export function useAmusementPark() {
  // ===== Persistent refs (shared with render loop) =====
  const movementAudioRef = useRef(null);
  const backgroundMusicRef = useRef(null);
  const stateRef = useRef(createStateController());
  const baseMeshRef = useRef(null);
  const interactablesRef = useRef([]);
  const meshToRootRef = useRef(new Map());
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
  const loadingControllerRef = useRef(null);
  const themeControllerRef = useRef(null);
  const audioControllerRef = useRef(null);
  const windowControllerRef = useRef(null);

  // =========================
  // 🔁 FRAME LOOP (HOOK)
  // =========================
  useThreeSceneLifecycle({
    onFrame: ({ scene, camera }) => {
      if (!baseMeshRef.current) {
        loadAmusementPark({
          scene,
          interactables: interactablesRef.current,
          meshToRoot: meshToRootRef.current,
          character: characterRef.current,
          modalContent,
          onBaseFound: (mesh) => {
            baseMeshRef.current = mesh;
          },
          onLoad: () => {
             // Delay slightly to ensure parsing is done? Or just call it.
             loadingControllerRef.current?.setLoaded();
          }
        });
      }

      groundControllerRef.current?.update();
      // 🔊 CHARACTER MOVEMENT SOUND (THIS WAS MISSING)
      if (characterRef.current.isMoving) {
        movementAudioRef.current?.start();
      } else {
        movementAudioRef.current?.stop();
      }

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
        meshToRoot: meshToRootRef.current,
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

    if (!movementAudioRef.current) {
      movementAudioRef.current = createMovementAudio();
    }

    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = createBackgroundMusic();
    }

    // Modal
    modalControllerRef.current = createModalController(modalContent);
    modalControllerRef.current.bind();
    
    // Loading Screen
    if (!loadingControllerRef.current) {
      loadingControllerRef.current = createLoadingController({
          onEnter: () => {
              // Optional: If you want to play a sound on enter like the original code did
              // playSound("projectsSFX"); 
              // playSound("backgroundMusic"); 
          }
      });
    }
    // Always bind to reset the loading screen state
    setTimeout(() => {
      loadingControllerRef.current?.bind();
    }, 100);

    // Theme Controller
    if (!themeControllerRef.current) {
      themeControllerRef.current = createThemeController();
      setTimeout(() => {
        themeControllerRef.current?.bind();
      }, 100);
    }

    // Audio Controller
    if (!audioControllerRef.current) {
      audioControllerRef.current = createAudioController({
        backgroundMusic: backgroundMusicRef.current,
      });
      setTimeout(() => {
        audioControllerRef.current?.bind();
      }, 100);
    }

    // Window Controller
    if (!windowControllerRef.current) {
      windowControllerRef.current = createWindowController();
      setTimeout(() => {
        windowControllerRef.current?.bind();
      }, 100);
    }

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
        modalControllerRef.current?.handleClick(state.getHovered());
      },
    });

    inputController.bind();

    // Touch Controller for mobile (swipe to move)
    const touchController = createTouchController({
      onMove: (direction) => {
        console.log('Touch swipe detected:', direction); // Debug log
        // Map swipe direction to keyboard event simulation
        const keyMap = {
          'up': { key: 'arrowup' },
          'down': { key: 'arrowdown' },
          'left': { key: 'arrowleft' },
          'right': { key: 'arrowright' }
        };
        handleKeyDown(keyMap[direction]);
      }
    });

    // Bind touch controls (will auto-detect touch support)
    touchController.bind();

    return () => {
      inputController.cleanup();
      touchController.cleanup();
      modalControllerRef.current?.cleanup();
      movementAudioRef.current?.cleanup();
      backgroundMusicRef.current?.cleanup();
      loadingControllerRef.current?.cleanup();
      themeControllerRef.current?.cleanup();
      audioControllerRef.current?.cleanup();
      windowControllerRef.current?.cleanup();
    };
  }, []);


}
