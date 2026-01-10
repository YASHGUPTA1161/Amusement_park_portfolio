"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import HTML from "./HTML.jsx";
import { createScene } from "./scene";

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

    // ==========================
    // MODAL ELEMENTS (HTML)
    // ==========================
    const modal = document.querySelector(".modal");
    const modalbgOverlay = document.querySelector(".modal-bg-overlay");
    const modalTitle = document.querySelector(".modal-title");
    const modalProjectDescription = document.querySelector(
      ".modal-project-description"
    );
    const modalVisitProjectButton = document.querySelector(
      ".modal-project-visit-button"
    );
    const modalExitButton = document.querySelector(".modal-exit-button");

    let isModalOpen = false;

    // ==========================
    // MODAL CONTENT (MATCH BLENDER NAMES)
    // ==========================
    const modalContent = {
      shop_25: {
        title: " 🍦Ice Cream Stall",
        content: "Street food and snacks available here.",
      },
      shop_18: {
        title: "🎮 Game Booth",
        content: "Arcade games and prizes.",
      },
      shop_17: {
        title: "🧸 Toy Shop",
        content: "Toys and souvenirs for kids.",
      },
      shop_26: {
        title: "🎯 Skill Game",
        content: "Test your skills and win rewards.",
      },
      shop_41: {
        title: "🍜 Food",
        content: "Test your skills and win rewards.",
      },

      bill_board_1_2: {
        title: "📢 Billboard",
        content: "Park announcements and events.",
      },
      small_billboard_2: {
        title: "🪧 Info Board",
        content: "Directions and park info.",
      },
      yellow_truck: {
        title: "🚚 Delivery Truck",
        content: "Supplies arrive here daily.",
      },
      ice_cream_truck: {
        title: "🍨 Ice Cream Truck",
        content: "Supplies arrive here daily.",
      },
      half_truck: {
        title: "🚘 Car",
        content: "Supplies arrive here daily.",
      },
      wending_machine: {
        title: "🥤 Vending Machine",
        content: "Snacks and drinks.",
      },
      wending_machine_2: {
        title: "🥤 Vending Machine",
        content: "More snacks. Same regret.",
      },
    };

    // ==========================
    // MODAL HELPERS
    // Keep modal logic together for readability
    // ==========================
    function showModal(id) {
      const content = modalContent[id];
      if (!content) return;

      modalTitle.textContent = content.title;
      modalProjectDescription.textContent = content.content;

      if (content.link) {
        modalVisitProjectButton.href = content.link;
        modalVisitProjectButton.classList.remove("hidden");
      } else {
        modalVisitProjectButton.classList.add("hidden");
      }

      modal.classList.remove("hidden");
      modalbgOverlay.classList.remove("hidden");
      isModalOpen = true;
    }

    function hideModal() {
      modal.classList.add("hidden");
      modalbgOverlay.classList.add("hidden");
      isModalOpen = false;
    }
    function onClick(event) {
      if (isModalOpen) return; // ❗ block when modal open
      if (!hovered) return; // ❗ nothing hovered
      showModal(hovered.name); // ✅ open correct modal
    }

    // ==========================
    // POINTER
    // ==========================
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
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ==========================
    // LOADER - GLTF
    // Load and register meshes, character, and base
    // ==========================
    const loader = new GLTFLoader();
    loader.load("./amusement_park.glb", (glb) => {
      console.log("GLB loaded successfully");

      glb.scene.traverse((child) => {
        // ✅ THIRD: Handle all other meshes
        if (child.name.toLowerCase() === "base") {
          baseMesh = child;
          console.log("✅ BASE FOUND!", child);
        }
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.metalness = 0.5;
          interactables.push(child);
        }
        // Handle character
        if (child.name.toLowerCase() === "character") {
          console.log("✅ CHARACTER FOUND!", child);
          character.instance = child;
          character.spawnPosition.copy(child.position);
          return;
        }
      });

      scene.add(glb.scene);
    });

    // ==========================
    // LIGHTS (UNCHANGED)
    // Grouped light setup
    // ==========================

    const charLight = new THREE.SpotLight(0xffffff, 2.5);
    charLight.position.set(23.79, 8.13, 1.06);
    charLight.angle = Math.PI / 6;
    charLight.penumbra = 0.4;
    charLight.decay = 2;
    charLight.distance = 30;
    charLight.castShadow = true;
    charLight.target.position.set(0, 0, 0);
    scene.add(charLight.target);
    scene.add(charLight);

    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.castShadow = true;
    sun.position.set(-40, 80, -20);
    sun.shadow.camera.left = -100;
    sun.shadow.camera.right = 100;
    sun.shadow.camera.top = 100;
    sun.shadow.camera.bottom = -100;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 150;
    sun.shadow.normalBias = 0.1;
    sun.shadow.mapSize.width = 4096;
    sun.shadow.mapSize.height = 4096;
    sun.target.position.set(50, 0, 0);
    scene.add(sun.target);
    scene.add(sun);

    const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
    scene.add(shadowHelper);

    // ==========================
    // CAMERA & CONTROLS
    // Using an orthographic camera
    // ==========================
    const aspect = sizes.width / sizes.height;
    const camera = new THREE.OrthographicCamera(
      -aspect * 10,
      aspect * 10,
      10,
      -10,
      1,
      1000
    );

    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableRotate = true; // ✅ Disable rotation
    controls.enablePan = true; // ✅ Disable panning
    controls.enableZoom = true;
    camera.position.set(8, 14, -3);
    controls.target.set(0, 0, 0);
    controls.update();

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

    window.addEventListener("keydown", onKeyDown);

    const JUMP_DURATION = 0.8;
    const MOVE_DISTANCE = 5;

    function onKeyDown(e) {
      if (!character.instance) return;
      if (character.isMoving) return;

      const key = e.key.toLowerCase();
      const currentPos = character.instance.position.clone();
      let targetPos = currentPos.clone();
      let targetRotation = character.instance.rotation.y;

      switch (key) {
        case "a":
        case "arrowup":
          targetPos.z += MOVE_DISTANCE;
          targetRotation = 0;
          break;

        case "d":
        case "arrowdown":
          targetPos.z -= MOVE_DISTANCE;
          targetRotation = Math.PI;
          break;

        case "s":
        case "arrowleft":
          targetPos.x += MOVE_DISTANCE;
          targetRotation = Math.PI / 2;
          break;

        case "w":
        case "arrowright":
          targetPos.x -= MOVE_DISTANCE;
          targetRotation = -Math.PI / 2;
          break;

        case "r":
          respawnCharacter();
          return;

        default:
          return;
      }

      // Animate movement with GSAP
      moveCharacter(targetPos, targetRotation);
    }

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
    function moveCharacter(targetPos, targetRotation) {
      character.isMoving = true;

      const tl = gsap.timeline({
        onComplete: () => {
          character.isMoving = false;

          // Auto-respawn if fallen off
          if (character.instance.position.y < -10) {
            respawnCharacter();
          }
        },
      });

      // Move horizontally
      tl.to(
        character.instance.position,
        {
          x: targetPos.x,
          z: targetPos.z,
          duration: JUMP_DURATION,
          ease: "power2.inOut",
        },
        0
      );

      // Rotate
      tl.to(
        character.instance.rotation,
        {
          y: targetRotation,
          duration: JUMP_DURATION * 0.5,
          ease: "power2.inOut",
        },
        0
      );

      // Jump arc (up and down)
      tl.to(
        character.instance.position,
        {
          y: "+=3",
          duration: JUMP_DURATION / 2,
          ease: "power1.out",
        },
        0
      );

      tl.to(
        character.instance.position,
        {
          y: targetPos.y,
          duration: JUMP_DURATION / 2,
          ease: "power1.in",
        },
        JUMP_DURATION / 2
      );

      // Squash and stretch
      tl.to(
        character.instance.scale,
        {
          x: 0.9,
          y: 1.2,
          z: 0.9,
          duration: JUMP_DURATION * 0.2,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        character.instance.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: JUMP_DURATION * 0.3,
          ease: "elastic.out(1, 0.5)",
        },
        JUMP_DURATION * 0.7
      );
    }
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
      if (character.instance) {
        const targetCameraPosition = new THREE.Vector3(
          character.instance.position.x + cameraOffset.x,
          cameraOffset.y,
          character.instance.position.z + cameraOffset.z
        );
        camera.position.copy(targetCameraPosition);
        camera.lookAt(
          character.instance.position.x,
          0, // Look at ground level
          character.instance.position.z
        );
      }

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

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(interactables, false);

      if (hits.length > 0) {
        const hitMesh = hits[0].object;
        const realObject = findRealObject(hitMesh);

        if (realObject && hovered !== realObject) {
          hovered = realObject;
          console.log("Hovered:", realObject.name);
        }
      } else {
        hovered = null;
      }

      renderer.render(scene, camera);
    }
    modalExitButton.addEventListener("click", (e) => {
      e.stopPropagation();
      hideModal();
    });

    modalbgOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      hideModal();
    });
    window.addEventListener("click", onClick);

    renderer.setAnimationLoop(animate);

    // ✅ CLEANUP FUNCTION
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      modalExitButton.removeEventListener("click", (e) => {
        e.stopPropagation();
        hideModal();
      });
      modalbgOverlay.removeEventListener("click", (e) => {
        e.stopPropagation();
        hideModal();
      });

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
