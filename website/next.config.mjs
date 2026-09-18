/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Automatically sync client assets and server routes with Vercel deployment version
  deploymentId: process.env.VERCEL_DEPLOYMENT_ID || undefined,
};

export default nextConfig;

