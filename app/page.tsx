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
          zIndex: 1000,
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
    </div>
  );
}

