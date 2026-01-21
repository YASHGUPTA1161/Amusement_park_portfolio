"use client";

import { useEffect } from "react";
import HTML from "./HTML.jsx";
import { useAmusementPark } from "./useAmusementPark";

export default function AmusementPark() {
  useAmusementPark();

  // Handle game notice dismiss
  useEffect(() => {
    const handleDismiss = () => {
      const button = document.querySelector('.game-notice .mobile-notice-dismiss');
      const banner = document.querySelector('.game-notice');
      
      if (button && banner) {
        button.addEventListener('click', () => {
          banner.style.display = 'none';
          sessionStorage.setItem('gameNoticeDismissed', 'true');
        });
      }

      // Check if already dismissed
      if (sessionStorage.getItem('gameNoticeDismissed') === 'true') {
        if (banner) {
          banner.style.display = 'none';
        }
      }
    };

    // Wait for DOM
    setTimeout(handleDismiss, 500);
  }, []);

  return (
    <>
      <HTML />
    </>
  );
}
