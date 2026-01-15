import { Howl } from "howler";

export function createMovementAudio() {
  const walk = new Howl({
    src: ["/sfx/jumpsfx.ogg"],
    loop: false,
    volume: 0.6,
  });

  let playing = false;

  return {
    start() {
      if (playing) return;
      walk.play();
      playing = true;
    },

    stop() {
      if (!playing) return;
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
