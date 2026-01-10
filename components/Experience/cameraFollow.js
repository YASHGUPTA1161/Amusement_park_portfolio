export function updateCameraFollow({ camera, character, offset }) {
  if (!character.instance) return;

  camera.position.set(
    character.instance.position.x + offset.x,
    offset.y,
    character.instance.position.z + offset.z
  );

  camera.lookAt(
    character.instance.position.x,
    0,
    character.instance.position.z
  );
}
