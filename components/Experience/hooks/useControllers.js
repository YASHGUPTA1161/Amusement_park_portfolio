// Custom hook to manage all game controllers
import { useEffect, useRef } from 'react';
import { createModalController } from '../modalController';
import { createLoadingController } from '../loadingController';
import { createThemeController } from '../themeController';
import { createAudioController } from '../audioController';
import { createWindowController } from '../windowController';

export function useControllers({ modalContent, backgroundMusic }) {
  const modalControllerRef = useRef(null);
  const loadingControllerRef = useRef(null);
  const themeControllerRef = useRef(null);
  const audioControllerRef = useRef(null);
  const windowControllerRef = useRef(null);

  useEffect(() => {
    // Wait for DOM to be ready before binding controllers
    const initControllers = () => {
      // Modal Controller
      if (!modalControllerRef.current) {
        modalControllerRef.current = createModalController(modalContent);
      }
      modalControllerRef.current.bind();

      // Loading Controller
      if (!loadingControllerRef.current) {
        loadingControllerRef.current = createLoadingController({
          onEnter: () => {
            // Optional: play sounds on enter
          }
        });
      }
      loadingControllerRef.current.bind();

      // Theme Controller
      if (!themeControllerRef.current) {
        themeControllerRef.current = createThemeController();
      }
      themeControllerRef.current.bind();

      // Audio Controller
      if (!audioControllerRef.current && backgroundMusic) {
        audioControllerRef.current = createAudioController({
          backgroundMusic: backgroundMusic,
        });
      }
      audioControllerRef.current?.bind();

      // Window Controller
      if (!windowControllerRef.current) {
        windowControllerRef.current = createWindowController();
      }
      windowControllerRef.current.bind();
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(initControllers, 100);

    return () => {
      clearTimeout(timeoutId);
      modalControllerRef.current?.cleanup();
      loadingControllerRef.current?.cleanup();
      themeControllerRef.current?.cleanup();
      audioControllerRef.current?.cleanup();
      windowControllerRef.current?.cleanup();
    };
  }, [modalContent, backgroundMusic]);

  return {
    modalController: modalControllerRef.current,
    loadingController: loadingControllerRef.current,
    themeController: themeControllerRef.current,
    audioController: audioControllerRef.current,
    windowController: windowControllerRef.current,
  };
}
