/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.flowcode.com',
      'ui-avatars.com',
      'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.flowcode.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;