"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { createScene } from "./scene";
import { setupLights } from "./lights";
import { createCamera } from "./camera";
import { createRenderer } from "./renderer";

// Store lighting controller globally so theme controller can access it
let lightingController = null;

export function getLightingController() {
  return lightingController;
}

export function useThreeSceneLifecycle({ onFrame }) {
  useEffect(() => {
    const scene = createScene();

    lightingController = setupLights(scene);

    const canvas = document.getElementById("experience-canvas");
    if (!canvas) return;

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const renderer = createRenderer(canvas, sizes);
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

    function animate() {
      controls.update();
      onFrame({ scene, camera, renderer });
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      lightingController?.cleanup();
      lightingController = null;
      renderer.dispose();
      renderer.setAnimationLoop(null);
    };
  }, []);
}
