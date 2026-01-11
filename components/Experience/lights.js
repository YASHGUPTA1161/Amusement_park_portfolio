import * as THREE from "three";

export function setupLights(scene) {
  const lights = [];

  // Ambient
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  lights.push(ambient);

  // Hemisphere
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);
  lights.push(hemiLight);

  // Character spotlight
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

  lights.push(charLight, charLight.target);

  // Sun
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
  sun.shadow.mapSize.set(4096, 4096);

  sun.target.position.set(50, 0, 0);
  scene.add(sun.target);
  scene.add(sun);

  lights.push(sun, sun.target);

  // Debug helper (dev only, still must be cleaned)
  const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
  scene.add(shadowHelper);
  lights.push(shadowHelper);

  // ✅ cleanup
  return () => {
    for (const obj of lights) {
      scene.remove(obj);
      if (obj.dispose) obj.dispose();
    }
  };
}
