import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.aakritiartgallery.com",
      },
      {
        protocol: "https",
        hostname: "nanopixel.vercel.app",
        pathname: "/**",
      },
      // ✅ Cloudinary add kar diya gaya hai
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "nanopixel.vercel.app",
      },
    ],
  },
  /* config options here */
  
};

export default nextConfig;