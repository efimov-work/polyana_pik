const STATIC_EXPORT = process.env.STATIC_EXPORT === '1';
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '');

const server = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      }
    ];
  }
};

const staticExport = {
  output: 'export',
  basePath: BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true }
};

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(STATIC_EXPORT ? staticExport : server)
};

export default nextConfig;
