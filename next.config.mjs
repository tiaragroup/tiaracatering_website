/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into out/ for Firebase Hosting.
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
