// components/Experience/audioController.js
export function createAudioController({ backgroundMusic }) {
  const audioButton = document.querySelector(".audio-toggle-button");
  const firstIconTwo = document.querySelector(".first-icon-two");
  const secondIconTwo = document.querySelector(".second-icon-two");

  let isMusicPlaying = false;

  function toggleAudio() {
    console.log("Audio toggle button clicked");
    console.log("backgroundMusic exists:", !!backgroundMusic);
    
    if (backgroundMusic) {
      backgroundMusic.toggle();
      isMusicPlaying = backgroundMusic.isPlaying();
      
      console.log("Music is now playing:", isMusicPlaying);

      if (isMusicPlaying) {
        // Music playing - show audio waves icon
        if (firstIconTwo) firstIconTwo.style.display = "block";
        if (secondIconTwo) secondIconTwo.style.display = "none";
      } else {
        // Music paused - show flat bars icon
        if (firstIconTwo) firstIconTwo.style.display = "none";
        if (secondIconTwo) secondIconTwo.style.display = "block";
      }
    } else {
      console.error("Background music not initialized!");
    }
  }

  function bind() {
    audioButton?.addEventListener("click", toggleAudio);
  }

  function cleanup() {
    audioButton?.removeEventListener("click", toggleAudio);
  }

  return {
    bind,
    cleanup,
    toggleAudio,
    isMusicPlaying: () => isMusicPlaying,
  };
}
