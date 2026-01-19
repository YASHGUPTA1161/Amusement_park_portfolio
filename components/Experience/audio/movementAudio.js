import { Howl } from "howler";

export function createMovementAudio() {
  const walk = new Howl({
    src: ["/sfx/jumpsfx.ogg"],
    loop: false,
    volume: 0.6,
    html5: true, // Use HTML5 Audio for better compatibility
    format: ['ogg'],
    onload: function() {
      console.log("Movement audio loaded successfully");
    },
    onloaderror: function(id, error) {
      console.error("Error loading movement audio:", error);
    }
  });

  let playing = false;

  return {
    start() {
      if (playing) return;
      console.log("Playing movement sound");
      try {
        walk.play();
        playing = true;
      } catch (e) {
        console.error("Error playing movement sound:", e);
      }
    },

    stop() {
      if (!playing) return;
      console.log("Stopping movement sound");
      walk.pause();
      playing = false;
    },

    mute() {
      walk.mute(true);
    },

    unmute() {
      walk.mute(false);
    },

    cleanup() {
      walk.unload();
    },
  };
}
