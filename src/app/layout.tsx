import type { Metadata } from 'next'
import { Noto_Sans_KR, Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: '도안동 (Doan-dong) - 대바늘 도안 플랫폼',
  description:
    '포근한 양모 실 짜는 소리와 함께 나만의 대바늘 뜨개 도안을 설계하고 공유하세요.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${inter.variable}`}>
      <head>
        {/* FontAwesome CDN for Icons */}
        <link
          rel="stylesheet"
          href="[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)"
          precedence="default"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[var(--color-moss-50)] text-[var(--color-midnight)] antialiased">
        <Navigation />
        <main className="flex flex-grow flex-col">{children}</main>
      </body>
    </html>
  )
}
