import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      //for api
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8005/api/:path*',
      },

      //for files
      {
        source: '/files/:path*',
        destination: 'http://127.0.0.1:8005/files/:path*',
      },
    ];
  },
};

export default nextConfig;
