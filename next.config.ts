import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ancienne adresse de la page d'inscription a la newsletter
      { source: '/00', destination: '/newsletter', permanent: true },
    ];
  },
};

export default nextConfig;
