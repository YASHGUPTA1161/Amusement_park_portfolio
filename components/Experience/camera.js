import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createCamera(sizes, canvas) {
  const aspect = sizes.width / sizes.height;

  const camera = new THREE.OrthographicCamera(
    -aspect * 10,
    aspect * 10,
    10,
    -10,
    1,
    1000
  );

  camera.position.set(8, 14, -3);

  const controls = new OrbitControls(camera, canvas);
  controls.enableRotate = true;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.target.set(0, 0, 0);
  controls.update();

  return { camera, controls };
}
