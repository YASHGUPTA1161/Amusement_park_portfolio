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
import { createGroundController } from "./groundController";

export default function AmusementPark() {
  useEffect(() => {
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
    const baseMesh = { current: null };

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

    const scene = createScene();
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

    function animate() {
      controls.update(); // Keep this for zoom
      groundController.update();

      // ✅ CAMERA FOLLOWS CHARACTER
      updateCameraFollow({
        camera,
        character,
        offset: cameraOffset,
      });

      // ✅ CHECK IF ON GROUND (throttled check)

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
