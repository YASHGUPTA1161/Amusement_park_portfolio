import gsap from "gsap";

export function createLoadingController({ onEnter }) {
  const loadingScreen = document.getElementById("loadingScreen");
  const loadingText = document.querySelector(".loading-text");
  const enterButton = document.querySelector(".enter-button");
  const instructions = document.querySelector(".instructions");

  function setLoaded() {
    const t1 = gsap.timeline();

    if (loadingText) {
      t1.to(loadingText, {
        opacity: 0,
        duration: 0.5,
      });
    }

    if (enterButton) {
      t1.to(enterButton, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5
      });
      enterButton.style.pointerEvents = "auto"; // Ensure it's clickable
    }
  }

  function handleEnter() {
    // Notify parent to play sound or unmute
    onEnter?.();

    // Animate out
    if (loadingScreen) {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5, // Smooth fade
        onComplete: () => {
             loadingScreen.style.display = 'none'; // Hide it
             loadingScreen.style.pointerEvents = 'none'; // Ensure it doesn't block clicks
        },
      });
    }

    if (instructions) {
       gsap.to(instructions, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            instructions.style.display = 'none'; // Hide it
        }
      });
    }
  }

  function bind() {
    // Reset loading screen to visible state
    if (loadingScreen) {
      loadingScreen.style.display = 'flex';
      loadingScreen.style.opacity = '1';
      loadingScreen.style.pointerEvents = 'auto';
    }
    
    if (instructions) {
      instructions.style.display = 'flex';
      instructions.style.opacity = '1';
    }
    
    if (enterButton) {
      enterButton.style.opacity = '0';
      enterButton.style.pointerEvents = 'none';
    }
    
    if (loadingText) {
      loadingText.style.opacity = '1';
    }
    
    enterButton?.addEventListener("click", handleEnter);
  }

  function cleanup() {
    enterButton?.removeEventListener("click", handleEnter);
  }

  return {
    bind,
    cleanup,
    setLoaded,
  };
}
