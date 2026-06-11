'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: '홈', icon: 'fa-house' },
    { href: '/editor', label: '도안 에디터', icon: 'fa-pen-ruler' },
    { href: '/shopping', label: '도안 쇼핑', icon: 'fa-bag-shopping' },
    { href: '/mypage', label: '마이페이지', icon: 'fa-user-gear' }
  ]

  return (
    <header className="sticky top-0 z-40 shrink-0 border-b border-[var(--color-moss-100)] bg-[#f0e9df]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5d6e4c] text-white shadow-md">
              <i className="fa-solid fa-compass-drafting text-lg" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#3a332d]">
                도안동
              </span>
              <span className="-mt-1 block text-[10px] font-semibold tracking-widest text-[#c65a43]">
                FAIR ISLE TONE
              </span>
            </div>
          </Link>

          {/* 데스크탑 링크 */}
          <nav className="hidden space-x-1 md:flex">
            {links.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all ${isActive ? 'bg-[#eadfc9] font-bold text-[#3a332d]' : 'text-gray-600 hover:bg-[#eadfc9]/50'}`}>
                  <i className={`fa-solid ${link.icon} mr-1.5`} /> {link.label}
                </Link>
              )
            })}
          </nav>

          {/* 우측 프로필 정보 */}
          <div className="flex items-center gap-4">
            <Link
              href="/shopping"
              className="text-midnight relative rounded-full p-2 transition-all hover:bg-white/50">
              <i className="fa-solid fa-cart-shopping text-lg" />
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-[var(--color-moss-100)] bg-white py-1 pr-3 pl-1">
              <img
                src="[https://placehold.co/100x100/5d6e4c/ffffff?text=Creator](https://placehold.co/100x100/5d6e4c/ffffff?text=Creator)"
                alt="Profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-[#3a332d]">
                김도안 님
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
