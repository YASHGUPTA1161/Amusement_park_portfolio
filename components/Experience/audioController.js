// components/Experience/audioController.js
export function createAudioController({ backgroundMusic }) {
  const audioButton = document.querySelector(".audio-toggle-button");
  const firstIconTwo = document.querySelector(".first-icon-two");
  const secondIconTwo = document.querySelector(".second-icon-two");

  let isMusicPlaying = false;

  function toggleAudio() {
    if (backgroundMusic) {
      backgroundMusic.toggle();
      isMusicPlaying = !isMusicPlaying;

      if (isMusicPlaying) {
        // Music playing
        firstIconTwo.style.display = "block";
        secondIconTwo.style.display = "none";
      } else {
        // Music paused
        firstIconTwo.style.display = "none";
        secondIconTwo.style.display = "block";
      }
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
