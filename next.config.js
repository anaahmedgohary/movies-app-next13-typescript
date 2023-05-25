/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "image.tmdb.org",
      "images.google.com",
      "compote.slate.com",
      "www.pexels.com",
      "images.pexels.com",
      "pexels.com",
      "media.istockphoto.com",
    ],
  },
};

module.exports = nextConfig;
