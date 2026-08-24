/** @type {import('next').NextConfig} */

// Lets next/image accept the CDN as an external image source if
// `images.unoptimized` is ever turned off later.
function mediaRemotePatterns() {
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
  if (!base) return [];
  try {
    const { protocol, hostname } = new URL(base);
    return [{ protocol: protocol.replace(":", ""), hostname }];
  } catch {
    return [];
  }
}

const nextConfig = {
  // Default (server) output — required for the /api/visit route handler
  // to run. Vercel deploys this as serverless functions automatically;
  // everything else on the site still renders to static HTML at build time.
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: mediaRemotePatterns(),
  },
};

module.exports = nextConfig;