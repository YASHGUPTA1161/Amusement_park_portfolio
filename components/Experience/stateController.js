// components/Blender/stateController.js

export function createStateController() {
  let hovered = null;

  return {
    setHovered(next) {
      hovered = next;
    },

    clearHovered() {
      hovered = null;
    },

    getHovered() {
      return hovered;
    },
  };
}
