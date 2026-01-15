import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true, // Enable gzip compression
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Configure headers for caching static assets
  async headers() {
    return [
      {
        source: '/amusement_park.glb',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sfx/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
