/** @type {import('next').NextConfig} */
const nextConfig = {
  // Default (server) output — required for the /api/visit route handler
  // to run. Vercel deploys this as serverless functions automatically;
  // everything else on the site still renders to static HTML at build time.
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;