'use client';
import dynamic from 'next/dynamic';
const ThemeProviderNoSSR = dynamic(() => import('next-themes').then((mod) => mod.ThemeProvider), {
  ssr: false,  // 禁用服务器端渲染
});
export default ThemeProviderNoSSR;
