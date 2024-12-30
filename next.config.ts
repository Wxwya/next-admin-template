import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 你希望代理的路径
        destination: 'http://192.168.1.227:8088/api/:path*', // 后端接口的地址
      },
    ];
  },
  images: {
    domains: ['192.168.1.227'], // 允许加载的图片源的主机名
  },
  async redirects() {
    return [
      {
        source: '/', // 原始 URL
        destination: '/goodsType', // 目标 URL
        permanent: true, // 永久重定向
      },
    ]
  },
  reactStrictMode: false,
};

export default nextConfig;
