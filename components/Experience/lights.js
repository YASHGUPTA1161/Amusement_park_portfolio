import * as THREE from "three";
import gsap from "gsap";

export function setupLights(scene) {
  const lights = [];

  // Ambient - will change between day/night
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  lights.push(ambient);

  // Hemisphere - will change between day/night
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);
  lights.push(hemiLight);

  // Character spotlight - stays the same
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

  // Sun - will be hidden in night mode
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
  sun.shadow.mapSize.set(2048, 2048); // Optimized from 4096 for better performance

  sun.target.position.set(50, 0, 0);
  scene.add(sun.target);
  scene.add(sun);

  lights.push(sun, sun.target);

  // Debug helper (dev only, still must be cleaned)
  const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
  scene.add(shadowHelper);
  lights.push(shadowHelper);

  // Temporary objects for color animation
  const hemiColorProxy = { r: 1, g: 1, b: 1 }; // Start with white
  const sunColorProxy = { r: 1, g: 1, b: 1 }; // Start with white
  const ambientColorProxy = { r: 1, g: 1, b: 1 }; // Start with white

  // Function to toggle between day and night lighting with smooth transitions
  function setNightMode(isNight) {
    const duration = 2; // 2 seconds for sunrise/sunset effect

    if (isNight) {
      // NIGHT MODE: 3x darker with purple/blue metallic tints
      gsap.to(ambient, {
        intensity: 0.3,  // Much darker (was 0.4)
        duration: duration,
        ease: "power2.inOut"
      });

      // Animate ambient color to purple/blue tint for metallic look
      gsap.to(ambientColorProxy, {
        r: 0.25,
        g: 0.31,
        b: 0.78,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          ambient.color.setRGB(ambientColorProxy.r, ambientColorProxy.g, ambientColorProxy.b);
        }
      });

      gsap.to(hemiLight, {
        intensity: 0.3,  // Much darker (was 0.8)
        duration: duration,
        ease: "power2.inOut"
      });

      // Animate hemisphere color to night blue
      gsap.to(hemiColorProxy, {
        r: 0x66 / 255,
        g: 0x88 / 255,
        b: 0xcc / 255,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          hemiLight.color.setRGB(hemiColorProxy.r, hemiColorProxy.g, hemiColorProxy.b);
        }
      });

      gsap.to(sun, {
        intensity: 0.27,  // Very dim sun (was 0)
        duration: duration,
        ease: "power2.inOut",
        onComplete: () => {
          shadowHelper.visible = false;
        }
      });

      // Animate sun color to purple/blue for metallic vibrant look
      gsap.to(sunColorProxy, {
        r: 0.25,
        g: 0.41,
        b: 0.88,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          sun.color.setRGB(sunColorProxy.r, sunColorProxy.g, sunColorProxy.b);
        }
      });
    } else {
      // DAY MODE: Smooth sunrise transition
      shadowHelper.visible = true;

      gsap.to(ambient, {
        intensity: 1,
        duration: duration,
        ease: "power2.inOut"
      });

      // Animate ambient color back to white
      gsap.to(ambientColorProxy, {
        r: 1,
        g: 1,
        b: 1,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          ambient.color.setRGB(ambientColorProxy.r, ambientColorProxy.g, ambientColorProxy.b);
        }
      });

      gsap.to(hemiLight, {
        intensity: 3,
        duration: duration,
        ease: "power2.inOut"
      });

      // Animate hemisphere color to white
      gsap.to(hemiColorProxy, {
        r: 1,
        g: 1,
        b: 1,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          hemiLight.color.setRGB(hemiColorProxy.r, hemiColorProxy.g, hemiColorProxy.b);
        }
      });

      gsap.to(sun, {
        intensity: 2,
        duration: duration,
        ease: "power2.inOut"
      });

      // Animate sun color back to white
      gsap.to(sunColorProxy, {
        r: 1,
        g: 1,
        b: 1,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          sun.color.setRGB(sunColorProxy.r, sunColorProxy.g, sunColorProxy.b);
        }
      });
    }
  }

  // ✅ cleanup
  const cleanup = () => {
    for (const obj of lights) {
      scene.remove(obj);
      if (obj.dispose) obj.dispose();
    }
  };

  return {
    cleanup,
    setNightMode,
  };
}
