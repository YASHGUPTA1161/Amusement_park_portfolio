import * as THREE from "three";
import gsap from "gsap";

export function createGroundController({
  character,
  raycaster,
  baseMesh,
  respawnCharacter,
}) {
  const FALL_CHECK_INTERVAL = 100;
  let lastGroundCheckTime = 0;

  function isOnGround() {
    if (!character.instance || !baseMesh.current) return true;

    const rayOrigin = character.instance.position.clone();
    rayOrigin.y += 1;

    raycaster.set(rayOrigin, new THREE.Vector3(0, -1, 0));

    const hits = raycaster.intersectObject(baseMesh.current, true);
    return hits.length > 0 && hits[0].distance < 3;
  }

  function update() {
    const now = Date.now();
    if (now - lastGroundCheckTime < FALL_CHECK_INTERVAL) return;

    lastGroundCheckTime = now;

    if (!character.instance || character.isMoving) return;

    if (!isOnGround()) {
      gsap.to(character.instance.position, {
        y: -20,
        duration: 1,
        ease: "power2.in",
        onComplete: respawnCharacter,
      });
    }
  }

  return { update };
}
