/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: '**.a8.net' },
      { protocol: 'https', hostname: '**.a8.net', port: '', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
