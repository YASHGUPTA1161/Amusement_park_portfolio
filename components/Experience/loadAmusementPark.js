import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let loaded = false; // 🔒 module-level guard

export function loadAmusementPark({
  scene,
  interactables,
  character,
  onBaseFound,
  onLoad,
}) {
  if (loaded) return; // ⛔ prevent double load
  loaded = true;

  // We can use a LoadingManager if we had multiple assets, 
  // but for a single GLTF, the success callback is sufficient.
  const loader = new GLTFLoader();

  loader.load(
    "./amusement_park.glb",
    (glb) => {
      glb.scene.traverse((child) => {
        if (child.name.toLowerCase() === "base") {
          onBaseFound(child);
        }

        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.metalness = 0.5;
          interactables.push(child);
        }

        if (child.name.toLowerCase() === "character") {
          character.instance = child;
          character.spawnPosition.copy(child.position);
        }
      });

      scene.add(glb.scene);
      
      // Notify ready
      onLoad?.();
    },
    undefined,
    (err) => {
      console.error("Failed to load GLB", err);
      loaded = false; // optional: allow retry on failure
    }
  );
}
