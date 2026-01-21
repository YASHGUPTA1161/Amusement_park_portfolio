"use client";

import { useState, useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CenteredWindow from "@/components/CenteredWindow";
import AmusementPark from "@/components/Experience/AmusementPark";
import WaveAnimation from "@/components/WaveAnimation";

export default function Home() {
  const [showGame, setShowGame] = useState(false);

  // Listen for window toggle events from the game
  useEffect(() => {
    const handleWindowToggle = () => {
      setShowGame(false); // Switch back to Home window
    };

    window.addEventListener('toggleWindow', handleWindowToggle);
    
    return () => {
      window.removeEventListener('toggleWindow', handleWindowToggle);
    };
  }, []);

  // Handle mobile notice dismiss
  useEffect(() => {
    const handleDismiss = () => {
      const button = document.querySelector('.mobile-notice-dismiss');
      const banner = document.querySelector('.mobile-notice-banner');
      
      if (button && banner) {
        button.addEventListener('click', () => {
          (banner as HTMLElement).style.display = 'none';
          sessionStorage.setItem('mobileNoticeDismissed', 'true');
        });
      }

      // Check if already dismissed
      if (sessionStorage.getItem('mobileNoticeDismissed') === 'true') {
        if (banner) {
          (banner as HTMLElement).style.display = 'none';
        }
      }
    };

    handleDismiss();
  }, []);

  if (showGame) {
    return <AmusementPark />;
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#577eff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Wave Animation Background */}
      <WaveAnimation />

      {/* Lottie Game Icon - Top Left */}
      <div 
        onClick={() => setShowGame(true)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '80px',
          height: '80px',
          zIndex: 850,  // Below windows (900+) but above background
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Open 3D Amusement Park"
      >
        <DotLottieReact
          src="https://lottie.host/787221f5-3e7d-47dd-9739-f9743a0ff8e2/uLmCuLMH7f.lottie"
          stateMachineId="StateMachine1"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Home Window */}
      <CenteredWindow />

      {/* Orientation Warning for Windows Mode */}
      <div className="window-orientation-warning">
        <div className="window-orientation-content">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
            <path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"/>
          </svg>
          <p>Please rotate your device to portrait mode</p>
        </div>
      </div>

      {/* Mobile Notice Banner */}
      <div className="mobile-notice-banner">
        <div className="mobile-notice-content">
          <p>Hey there! Just letting you know that this site is best experienced on desktop. Some features might be wonky on different devices.</p>
          <button className="mobile-notice-dismiss">okay</button>
        </div>
      </div>
    </div>
  );
}

