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

    isWindowOpen = !isWindowOpen;

    if (centeredWindow) {
      if (isWindowOpen) {
        // Show window
        centeredWindow.style.visibility = "visible";
        centeredWindow.style.pointerEvents = "auto";
        centeredWindow.style.opacity = "0";
        
        // Fade in
        requestAnimationFrame(() => {
          centeredWindow.style.transition = "opacity 0.3s ease-in-out";
          centeredWindow.style.opacity = "1";
        });
      } else {
        // Fade out then hide
        centeredWindow.style.opacity = "0";
        setTimeout(() => {
          centeredWindow.style.visibility = "hidden";
          centeredWindow.style.pointerEvents = "none";
        }, 300);
      }
    }
  }

  function handleBackdropClick(event) {
    // Close window if clicking on the backdrop (not the window itself)
    if (event.target.classList.contains("center-wrap")) {
      toggleWindow();
    }
  }

  function bind() {
    // Initially hide the window
    if (centeredWindow) {
      centeredWindow.style.visibility = "hidden";
      centeredWindow.style.pointerEvents = "none";
      centeredWindow.style.opacity = "0";
      centeredWindow.addEventListener("click", handleBackdropClick);
    }
    
    windowButton?.addEventListener("click", toggleWindow);
  }

  function cleanup() {
    windowButton?.removeEventListener("click", toggleWindow);
    centeredWindow?.removeEventListener("click", handleBackdropClick);
  }

  return {
    bind,
    cleanup,
    toggleWindow,
  };
}
