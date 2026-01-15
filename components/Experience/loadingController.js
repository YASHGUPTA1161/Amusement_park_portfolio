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
             loadingScreen.style.display = 'none'; // Ensure it doesn't block clicks
             loadingScreen.remove(); // Remove purely to match snippets 'remove()' calls if desired, but hiding is safer for React unmounts not to crash. User snippet used remove().
        },
      });
    }

    if (instructions) {
       gsap.to(instructions, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            instructions.remove();
        }
      });
    }
  }

  function bind() {
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
