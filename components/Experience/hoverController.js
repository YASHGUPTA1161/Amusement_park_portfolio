export function updateHover({
  raycaster,
  mouse,
  camera,
  interactables,
  findRealObject,
  prevHovered,
}) {
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(interactables, false);

  if (hits.length === 0) return null;

  const hitMesh = hits[0].object;
  const realObject = findRealObject(hitMesh);

  if (!realObject) return null;
  if (prevHovered === realObject) return prevHovered;

  console.log("Hovered:", realObject.name);
  return realObject;
}
