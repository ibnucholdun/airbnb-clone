/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "fvnqkiognfnhyqbtxice.supabase.co",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
