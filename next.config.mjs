/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  eslint: {
    // Allow production builds even if there are ESLint warnings/errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
