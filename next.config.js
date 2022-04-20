/** @type {import('next').NextConfig} */

const ENV = process.env;

const {
  APP_ENVIRONMENT,
  APP_API_BASE_URL,
  APP_SENTRY_ENVIRONMENT,
  APP_SENTRY_DSN,
  NEXT_IMAGES_DOMAINS,
} = ENV;

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    APP_ENVIRONMENT,
    APP_API_BASE_URL,
    APP_SENTRY_ENVIRONMENT,
    APP_SENTRY_DSN,
    NEXT_IMAGES_DOMAINS,
  },
  images: {
    domains: NEXT_IMAGES_DOMAINS?.split(',') ?? [],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
