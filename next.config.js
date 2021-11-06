/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/menu',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/menu',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  distDir: 'build',
}
