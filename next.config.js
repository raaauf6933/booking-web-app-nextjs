/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

module.exports = nextConfig;
