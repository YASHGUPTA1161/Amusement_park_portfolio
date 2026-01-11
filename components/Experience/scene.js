import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  return scene;
}
