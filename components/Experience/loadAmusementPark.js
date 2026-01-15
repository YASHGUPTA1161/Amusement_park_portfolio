import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let loaded = false; // 🔒 module-level guard

export function loadAmusementPark({
  scene,
  interactables,
  meshToRoot,
  character,
  onBaseFound,
  onLoad,
  modalContent,
}) {
  if (loaded) return; // ⛔ prevent double load
  loaded = true;

  // We can use a LoadingManager if we had multiple assets, 
  // but for a single GLTF, the success callback is sufficient.
  const loader = new GLTFLoader();

  loader.load(
    "./amusement_park.glb",
    (glb) => {
      let baseMesh = null;

      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.metalness = 0.5;
        }

        // Only roots with modals are interactable
        if (modalContent[child.name]) {
          interactables.push(child);

          // Map ALL descendants → this root
          child.traverse((desc) => {
            if (desc.isMesh) {
              meshToRoot.set(desc, child);
            }
          });
        }

        if (child.name.toLowerCase() === "base") {
          baseMesh = child;
          onBaseFound(child);
          
          // Add base to interactables for hover detection (but no modal)
          interactables.push(child);
          child.traverse((desc) => {
            if (desc.isMesh) {
              meshToRoot.set(desc, child);
            }
          });
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
