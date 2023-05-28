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
      "hips.hearstapps.com",
      "cinedope.com",
      "www.thenews.com.pk",
      "static1.colliderimages.com",
      "www.geo.tv",
      "imgix.ranker.com",
      "preview.redd.it",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' www.google-analytics.com https://cdnjs.cloudflare.com https://ka-f.fontawesome.com https://kit.fontawesome.com; script-src 'self' https://kit.fontawesome.com https://ka-f.fontawesome.com https://cdnjs.cloudflare.com  www.google-analytics.com 'unsafe-inline'; base-uri 'self';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
