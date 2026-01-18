"use client";

import styles from './WaveAnimation.module.css';

export default function WaveAnimation() {
  return (
    <div className={styles.waveContainer}>
      <img src="/waves/wave-1.svg" alt="" className={styles.wave1} />
      <img src="/waves/wave-2.svg" alt="" className={styles.wave2} />
      <img src="/waves/wave-3.svg" alt="" className={styles.wave3} />
      <img src="/waves/wave-4.svg" alt="" className={styles.wave4} />
      <img src="/waves/wave-5.svg" alt="" className={styles.shape} />
    </div>
  );
}
