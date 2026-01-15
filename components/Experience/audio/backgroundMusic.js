import { Howl } from "howler";

export function createBackgroundMusic() {
  const music = new Howl({
    src: ["/sfx/music.ogg"],
    loop: true,
    volume: 0.3,
  });

  let isPlaying = false;

  return {
    play() {
      if (isPlaying) return;
      music.play();
      isPlaying = true;
    },

    pause() {
      if (!isPlaying) return;
      music.pause();
      isPlaying = false;
    },

    toggle() {
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
