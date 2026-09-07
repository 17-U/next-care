/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    // Photographies hébergées sur le CDN d'Unsplash — voir src/data/images.ts
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Qualité par défaut relevée (75 → 90) : le rendu net compte plus ici
    // que le poids, sur un site où la photo installe la confiance.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
export default nextConfig;
