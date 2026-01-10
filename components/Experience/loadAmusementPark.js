import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadAmusementPark({
  scene,
  interactables,
  character,
  onBaseFound,
}) {
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
    },
    undefined,
    (err) => {
      console.error("Failed to load GLB", err);
    }
  );
}
