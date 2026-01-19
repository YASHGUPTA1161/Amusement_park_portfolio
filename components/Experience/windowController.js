// components/Experience/windowController.js
export function createWindowController() {
  const windowButton = document.querySelector(".window-toggle-button");
  const centeredWindow = document.querySelector(".center-wrap");

  let isWindowOpen = false;

  function toggleWindow(event) {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
    }

    // Dispatch custom event to switch back to Home window
    const toggleEvent = new CustomEvent('toggleWindow');
    window.dispatchEvent(toggleEvent);
  }

  function handleBackdropClick(event) {
    // Close window if clicking on the backdrop (not the window itself)
    if (event.target.classList.contains("center-wrap")) {
      toggleWindow();
    }
  }

  function bind() {
    windowButton?.addEventListener("click", toggleWindow);
  }

  function cleanup() {
    windowButton?.removeEventListener("click", toggleWindow);
  }

  return {
    bind,
    cleanup,
    toggleWindow,
  };
}
