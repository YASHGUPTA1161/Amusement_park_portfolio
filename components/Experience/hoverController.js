export function updateHover({
  raycaster,
  mouse,
  camera,
  interactables,
  meshToRoot,
  prevHovered,
}) {
  raycaster.setFromCamera(mouse, camera);
  
  // Raycast recursively against all children
  const hits = raycaster.intersectObjects(interactables, true);

  if (hits.length === 0) return null;

  const hitMesh = hits[0].object;
  const root = meshToRoot.get(hitMesh);

  if (!root) return null;
  if (root === prevHovered) return prevHovered;

  console.log("Hovered:", root.name);
  return root;
}
