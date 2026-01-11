// components/Blender/inputController.js
export function createInputController({ onKeyDown, onPointerMove, onClick }) {
  function handleKeyDown(e) {
    onKeyDown?.(e);
  }

  function handlePointerMove(e) {
    onPointerMove?.(e);
  }

  function handleClick(e) {
    onClick?.(e);
  }

  function bind() {
    if (onKeyDown) window.addEventListener("keydown", handleKeyDown);
    if (onPointerMove)
      window.addEventListener("pointermove", handlePointerMove);
    if (onClick) window.addEventListener("click", handleClick);
  }

  function cleanup() {
    if (onKeyDown) window.removeEventListener("keydown", handleKeyDown);
    if (onPointerMove)
      window.removeEventListener("pointermove", handlePointerMove);
    if (onClick) window.removeEventListener("click", handleClick);
  }

  return {
    bind,
    cleanup,
  };
}
