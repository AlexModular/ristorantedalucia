import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  env: {
    LIGHTGALLERY_LICENSE_KEY: process.env.LIGHTGALLERY_LICENSE_KEY,
    IUBENDA_SITE_ID: process.env.IUBENDA_SITE_ID,
    IUBENDA_COOKIE_POLICY_ID: process.env.IUBENDA_COOKIE_POLICY_ID,
    IUBENDA_LANG: process.env.IUBENDA_LANG,
    SMTP_SERVER_HOST: process.env.SMTP_SERVER_HOST,
    SMTP_SERVER_PORT: process.env.SMTP_SERVER_PORT,
    SMTP_SERVER_USERNAME: process.env.SMTP_SERVER_USERNAME,
    SMTP_SERVER_PASSWORD: process.env.SMTP_SERVER_PASSWORD,
    SITE_MAIL_RECIEVER: process.env.SITE_MAIL_RECIEVER,
    NEXT_RECAPTCHA_SITE_KEY: process.env.NEXT_RECAPTCHA_SITE_KEY,
    NEXT_RECAPTCHA_SECRET_KEY: process.env.NEXT_RECAPTCHA_SECRET_KEY,
    NEXT_PUBLIC_MAPS_API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
      },
    ],
  },
  transpilePackages: ['@mep-agency/next-iubenda'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
