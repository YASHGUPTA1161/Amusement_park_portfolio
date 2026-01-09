"use client";

import React, { useState, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { lottieAnimations } from "@/lib/icons";

interface AnimatedIconProps {
  animationPath: string;
  alt: string;
}

const AnimatedIcon = ({ animationPath, alt }: AnimatedIconProps) => {
  const [animationData, setAnimationData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    fetch(animationPath)
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, [animationPath]);

  if (!animationData) {
    return <div className="w-5 h-5" />; // Placeholder while loading
  }

  return (
    <div
      className="w-5 h-5"
      onMouseEnter={() => {
        if (lottieRef.current) {
          lottieRef.current.play();
        }
      }}
      onMouseLeave={() => {
        if (lottieRef.current) {
          lottieRef.current.stop();
          lottieRef.current.goToAndStop(0, true);
        }
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{ width: 20, height: 20 }}
      />
    </div>
  );
};

const Social = () => {
  return (
    <div className="socials">
      <button className="social">
        <AnimatedIcon animationPath={lottieAnimations.twitter} alt="Twitter" />
      </button>
      <button className="social">
        <AnimatedIcon
          animationPath={lottieAnimations.linkedin}
          alt="LinkedIn"
        />
      </button>
      <button className="social">
        <AnimatedIcon
          animationPath={lottieAnimations.instagram}
          alt="Instagram"
        />
      </button>
      <button className="social">
        <AnimatedIcon animationPath={lottieAnimations.github} alt="GitHub" />
      </button>
    </div>
  );
};

export default Social;
