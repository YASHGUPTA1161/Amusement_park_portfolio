import { Howl } from "howler";

export function createBackgroundMusic() {
  const music = new Howl({
    src: ["/sfx/music.ogg"],
    loop: true,
    volume: 0.3,
    html5: true, // Use HTML5 Audio instead of Web Audio API for better compatibility
    format: ['ogg'],
    onload: function() {
      console.log("Background music loaded successfully");
    },
    onloaderror: function(id, error) {
      console.error("Error loading background music:", error);
    },
    onplay: function() {
      console.log("Background music started playing");
    },
    onpause: function() {
      console.log("Background music paused");
    }
  });

  let isPlaying = false;

  return {
    play() {
      if (isPlaying) return;
      console.log("Attempting to play background music");
      try {
        music.play();
        isPlaying = true;
      } catch (e) {
        console.error("Error playing music:", e);
      }
    },

    pause() {
      if (!isPlaying) return;
      console.log("Pausing background music");
      music.pause();
      isPlaying = false;
    },

    toggle() {
      console.log("Toggling background music, currently playing:", isPlaying);
      if (isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    isPlaying() {
      return isPlaying;
    },

    cleanup() {
      music.unload();
    },
  };
}
