"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import HTML from "./HTML.jsx";
import { createScene } from "./scene";
import { createRenderer } from "./renderer";
import { createCamera } from "./camera";
import { loadAmusementPark } from "./loadAmusementPark";
import { setupLights } from "./lights";
import { createCharacterController } from "./characterController";
import { updateHover } from "./hoverController";
import { createModalController } from "./modalController";
import { modalContent } from "./data/modalContent";
import { updateCameraFollow } from "./cameraFollow";

export default function AmusementPark() {
  useEffect(() => {
    // ==========================
    // CONSTANTS & GLOBALS
    // Grouped constants, vectors, and state objects
    // ==========================
    const cameraOffset = new THREE.Vector3(8, 14, -3);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const interactables = []; // meshes you want to detect
    let hovered = null;

    const character = {
      instance: null,
      isMoving: false,
      spawnPosition: new THREE.Vector3(),
    };
    let targetRotation = Math.PI / 2;
    let baseMesh = null; // Store reference to ground
    const FALL_CHECK_INTERVAL = 100; // Check every 100ms
    let lastGroundCheckTime = 0;

    const modalController = createModalController(modalContent);
    modalController.bind();
    const handleGlobalClick = () => {
      modalController.handleClick(hovered);
    };

    window.addEventListener("click", handleGlobalClick);

    function onPointerMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("pointermove", onPointerMove);

    // ==========================
    // SCENE SETUP
    // ==========================
    const scene = createScene();
    const canvas = document.getElementById("experience-canvas");
    if (!canvas) return;

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // ==========================
    // RENDERER
    // ==========================
    const renderer = createRenderer(canvas, sizes);

    // ==========================
    // LOADER - GLTF
    // Load and register meshes, character, and base
    // ==========================
    loadAmusementPark({
      scene,
      interactables,
      character,
      onBaseFound: (mesh) => {
        baseMesh = mesh;
      },
    });

    // ==========================
    // LIGHTS (UNCHANGED)
    setupLights(scene);
    // Grouped light setup
    // ==========================

    // ==========================
    // CAMERA & CONTROLS
    // Using an orthographic camera
    // ==========================

    const { camera, controls } = createCamera(sizes, canvas);
    scene.add(camera);

    // ==========================
    // RESIZE HANDLING
    // Keep responsive projection matrix update together
    // ==========================
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

    function respawnCharacter() {
      if (!character.instance) return;

      console.log("🔄 Respawning character...");

      // Reset position
      character.instance.position.copy(character.spawnPosition);
      character.instance.rotation.y = Math.PI / 2;
      character.isMoving = false;

      // Optional: Add spawn effect
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

    window.addEventListener("keydown", handleKeyDown);

    // ==========================
    // HELPERS
    // ==========================
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

    // ==========================
    // RENDER / ANIMATION LOGIC
    // moveCharacter, isOnGround, animate grouped together
    // ==========================
    // Check if character is standing on base
    function isOnGround() {
      if (!character.instance || !baseMesh) return true; // Assume safe if not loaded

      // Cast ray downward from character
      const rayOrigin = character.instance.position.clone();
      rayOrigin.y += 1; // Start from character center

      const rayDirection = new THREE.Vector3(0, -1, 0);
      raycaster.set(rayOrigin, rayDirection);

      const hits = raycaster.intersectObject(baseMesh, true);

      // If hit base within 2 units, character is on ground
      if (hits.length > 0 && hits[0].distance < 3) {
        return true;
      }

      return false;
    }

    function animate() {
      controls.update(); // Keep this for zoom

      // ✅ CAMERA FOLLOWS CHARACTER
      updateCameraFollow({
        camera,
        character,
        offset: cameraOffset,
      });

      // ✅ CHECK IF ON GROUND (throttled check)
      const currentTime = Date.now();
      if (currentTime - lastGroundCheckTime > FALL_CHECK_INTERVAL) {
        lastGroundCheckTime = currentTime;

        if (character.instance && !character.isMoving) {
          if (!isOnGround()) {
            console.log("⚠️ Character not on ground! Falling...");
            gsap.to(character.instance.position, {
              y: -20,
              duration: 1,
              ease: "power2.in",
              onComplete: () => {
                respawnCharacter();
              },
            });
            character.isMoving = true;
          }
        }
      }

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

    // ✅ CLEANUP FUNCTION
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointermove", onPointerMove);

      window.removeEventListener("click", handleGlobalClick);
      modalController.cleanup();
      // Cleanup WebGL resources
      renderer.dispose();
      renderer.setAnimationLoop(null);
    };
  }, []);

  return (
    <>
      <HTML />
    </>
  );
}
