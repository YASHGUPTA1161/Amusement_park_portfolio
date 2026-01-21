"use client";

import { useEffect, useState } from "react";
import HTML from "./HTML.jsx";
import { useAmusementPark } from "./useAmusementPark";

export default function AmusementPark() {
  const [showBanner, setShowBanner] = useState(true);
  
  useAmusementPark();

  const handleDismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem('gameNoticeDismissed', 'true');
  };

  return (
    <>
      <HTML />
      {/* Mobile Notice Banner - Game Mode */}
      {showBanner && (
        <div className="mobile-notice-banner game-notice">
          <div className="mobile-notice-content">
            <p>Swipe on the screen to move your character. This game is best experienced on desktop with keyboard controls!</p>
            <button className="mobile-notice-dismiss" onClick={handleDismissBanner}>okay</button>
          </div>
        </div>
      )}
    </>
  );
}
