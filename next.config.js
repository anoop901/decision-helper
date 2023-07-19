/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/decision-helper",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/decision-helper",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
