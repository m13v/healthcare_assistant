const { withContentlayer } = require('next-contentlayer');
const withPlugins = require('next-compose-plugins');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  }
};

module.exports = withPlugins(
  [withContentlayer],
  nextConfig
);