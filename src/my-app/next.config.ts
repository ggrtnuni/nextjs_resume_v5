import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: process.env.NODE_ENV === 'development' ? '' : '/dist/resume_v5',
};

export default nextConfig;
