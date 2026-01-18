// Custom hook to manage game audio
import { useRef, useEffect } from 'react';
import { createMovementAudio } from '../audio/movementAudio';
import { createBackgroundMusic } from '../audio/backgroundMusic';

export function useGameAudio(isCharacterMoving) {
  const movementAudioRef = useRef(null);
  const backgroundMusicRef = useRef(null);

  useEffect(() => {
    // Initialize audio on first mount
    if (!movementAudioRef.current) {
      movementAudioRef.current = createMovementAudio();
    }

    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = createBackgroundMusic();
    }

    return () => {
      movementAudioRef.current?.cleanup();
      backgroundMusicRef.current?.cleanup();
    };
  }, []);

  // Handle character movement sounds
  useEffect(() => {
    if (isCharacterMoving) {
      movementAudioRef.current?.start();
    } else {
      movementAudioRef.current?.stop();
    }
  }, [isCharacterMoving]);

  return {
    movementAudio: movementAudioRef.current,
    backgroundMusic: backgroundMusicRef.current,
  };
}
