/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [{
      hostname: 'localhost'
    }]
  }
};

export default nextConfig;
