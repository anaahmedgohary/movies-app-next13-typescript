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
              "default-src 'self'; script-src 'self' https://www.youtube.com/iframe_api https://www.youtube.com https://kit.fontawesome.com https://ka-f.fontawesome.com www.google-analytics.com; style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com 'unsafe-inline'; font-src 'self' https://cdnjs.cloudflare.com https://ka-f.fontawesome.com https://fonts.gstatic.com; img-src 'self' https: data:; frame-src https://www.youtube.com/iframe_api https://www.youtube.com; base-uri 'self';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
