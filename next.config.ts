import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "sangw.in",
      "localhost",
      "picsum.photos",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ], // <== Domain name
  },
};

export default nextConfig;
