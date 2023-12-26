/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  swcMinify: true,
}

export default nextConfig
