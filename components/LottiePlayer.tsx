"use client";

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Dynamically import DotLottieReact with no SSR
const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false }
);

type DotLottieProps = ComponentProps<typeof DotLottieReact>;

export default function LottiePlayer(props: DotLottieProps) {
  return <DotLottieReact {...props} />;
}
