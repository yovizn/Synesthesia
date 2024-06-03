/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   typedRoutes: true
  // },
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_IMAGES_HOSTNAME,
      },
    ],
  },
}

export default nextConfig;
