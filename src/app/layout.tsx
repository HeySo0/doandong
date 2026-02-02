import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Doandong',
  description: 'Knitting Pattern Platform'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                도안동
              </Link>

              {/* Search Bar */}
              <div className="relative hidden w-96 md:flex">
                <input
                  type="text"
                  placeholder="도안 검색..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pr-4 pl-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                />
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <Link
                href="/editor"
                className="text-sm font-medium transition-colors hover:text-indigo-600">
                도안제작
              </Link>
              <Link
                href="/market"
                className="text-sm font-medium transition-colors hover:text-indigo-600">
                마켓
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium transition-colors hover:text-indigo-600">
                커뮤니티
              </Link>
              <Link
                href="/mypage"
                className="text-sm font-medium transition-colors hover:text-indigo-600">
                <div className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                  👤
                </div>
              </Link>
            </nav>
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-[1600px] flex-1">
          <aside className="hidden w-64 border-r border-gray-100 px-4 py-8 lg:block dark:border-gray-800">
            <nav className="space-y-6">
              <div className="space-y-1">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  <span className="w-5">🕒</span> 최근항목
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  <span className="w-5">💬</span> 커뮤니티
                </Link>
              </div>

              <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
                <h3 className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  팀 프로젝트
                </h3>
                <div className="space-y-1">
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    <span className="w-5">📝</span> 초안
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    <span className="w-5">📦</span> 리소스
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    <span className="w-5">🗑️</span> 휴지통
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  <span className="w-5">⭐</span> 즐겨찾기
                </Link>
              </div>
            </nav>
          </aside>
          <aside>{children}</aside>
        </div>
      </body>
    </html>
  )
}
