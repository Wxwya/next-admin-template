import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import  { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "next-themes"

const ddjbt = localFont({
  src: './fonts/DingTalkJinBuTi.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Xwya Blog', // %s会被替换为子页面的标题
    default: 'Xwya Blog' // 默认标题（当子页面未设置时使用）
  },
  description: 'Xwya的个人博客，分享技术文章和开发经验',
  keywords: ['关于', '联系方式', '技术栈',"前端","全栈","物联网","Wbe3","Vue","React","Umi","Nextjs","Nuxtjs","Uniapp"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ddjbt.className}  antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          </ThemeProvider>
      </body>
    </html>
  )
}
