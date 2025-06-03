import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
// ⚠ The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };

// export default withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
export default withNextIntl(nextConfig);
