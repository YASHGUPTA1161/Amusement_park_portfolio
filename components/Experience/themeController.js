// components/Experience/themeController.js
import { getLightingController } from "./useThreeSceneLifecycle";

export function createThemeController() {
  const themeButton = document.querySelector(".theme-mode-toggle-button");
  const firstIcon = document.querySelector(".first-icon");
  const secondIcon = document.querySelector(".second-icon");
  const body = document.body;

  let isDarkMode = false;

  function toggleTheme() {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
      // Dark mode (night)
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      
      // Swap icons
      firstIcon.style.display = "none";
      secondIcon.style.display = "block";

      // Update 3D lighting to night mode
      const lightingController = getLightingController();
      if (lightingController) {
        lightingController.setNightMode(true);
      }
    } else {
      // Light mode (day)
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      
      // Swap icons
      firstIcon.style.display = "block";
      secondIcon.style.display = "none";

      // Update 3D lighting to day mode
      const lightingController = getLightingController();
      if (lightingController) {
        lightingController.setNightMode(false);
      }
    }
  }

  function bind() {
    // Set initial state to light theme
    body.classList.add("light-theme");
    
    themeButton?.addEventListener("click", toggleTheme);
  }

  function cleanup() {
    themeButton?.removeEventListener("click", toggleTheme);
  }

  return {
    bind,
    cleanup,
    toggleTheme,
  };
}
