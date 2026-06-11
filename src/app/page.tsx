'use client'

import React from 'react'
import Link from 'next/link'
import ShopItemCard from '@/components/shopping/ShopItemCard'
import { ShoppingItem } from '@/types'

const POPULAR_ITEMS: ShoppingItem[] = [
  {
    id: 'shop-1',
    title: '초록 여우 크로스스티치',
    category: 'cross-stitch',
    categoryText: '십자수',
    creator: '실공장 이씨',
    price: 4200,
    rating: 4.8,
    isPurchased: true,
    desc: '차분한 단풍빛 페어아일 여우 패턴.'
  },
  {
    id: 'shop-2',
    title: '레트로 테트리스 비즈 도안',
    category: 'beads',
    categoryText: '프랑스자수',
    creator: '비즈마스터',
    price: 2800,
    rating: 4.5,
    isPurchased: true,
    desc: '빈티지 게임보이 감성 자수.'
  },
  {
    id: 'shop-3',
    title: '숲속 수선화 손가락 장갑 도안',
    category: 'knitting',
    categoryText: '손뜨개',
    creator: '스튜디오 세이지',
    price: 6500,
    rating: 4.9,
    isPurchased: false,
    desc: '수선화 머플러 및 대바늘 가이드.'
  },
  {
    id: 'shop-4',
    title: '체커보드 파우치 픽셀 가이드',
    category: 'pixel',
    categoryText: '픽셀/기타',
    creator: '도안러블리',
    price: 1500,
    rating: 4.2,
    isPurchased: false,
    desc: '체크 패턴 미니 파우치.'
  }
]

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
      {/* 히어로 배너 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-moss-500)] to-[var(--color-moss-400)] p-8 text-white shadow-xl sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(#eadfc9_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
        <div className="knit-stripe absolute right-0 bottom-0 left-0 h-2" />

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="inline-block rounded-full border border-white/20 bg-[#c65a43] px-3 py-1 text-xs font-bold text-white shadow-sm">
            도안동 아틀리에 오픈 🧶
          </span>
          <h1 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            따뜻한 실 한 올이 <br className="hidden sm:inline" />
            예쁜 도안으로 태어나는 곳
          </h1>
          <p className="text-moss-50/90 text-sm font-light sm:text-base">
            포근한 털실과 대바늘 기호를 닮은 도안동 에디터에서 나만의 오리지널
            작품을 한 땀 한 땀 자유롭게 그려보세요.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href="/editor"
              className="flex items-center gap-1 rounded-xl bg-[#3a332d] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-[#3a332d]/80">
              지금 에디터 시작하기{' '}
              <i className="fa-solid fa-arrow-right ml-1"></i>
            </Link>
            <Link
              href="/shopping"
              className="rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20">
              도안 마켓 구경하기
            </Link>
          </div>
        </div>
      </div>

      {/* 특장점 소개 그리드 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link
          href="/editor"
          className="group rounded-2xl border border-[var(--color-moss-100)] bg-white p-6 transition-all hover:border-[#5d6e4c] hover:shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0e9df] text-[#5d6e4c] transition-all group-hover:bg-[#5d6e4c] group-hover:text-white">
            <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
          </div>
          <h3 className="mb-2 text-lg font-bold text-[#3a332d]">
            대바늘 코수 맞춤형 에디터
          </h3>
          <p className="text-xs leading-relaxed font-light text-gray-500">
            손쉬운 픽셀 격자 방식을 적용하여 뜨개질 모티브, 대바늘 도안 기호
            패턴을 한땀씩 채워나갈 수 있습니다.
          </p>
        </Link>
        <Link
          href="/shopping"
          className="group rounded-2xl border border-[var(--color-moss-100)] bg-white p-6 transition-all hover:border-[#5d6e4c] hover:shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0e9df] text-[#5d6e4c] transition-all group-hover:bg-[#5d6e4c] group-hover:text-white">
            <i className="fa-solid fa-store text-xl" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-[#3a332d]">
            크리에이터 감성 마켓
          </h3>
          <p className="text-xs leading-relaxed font-light text-gray-500">
            포근한 감성을 나누는 금손 작가들의 고퀄리티 수공예 도안을 편하게
            고르고 가이드를 소장하세요.
          </p>
        </Link>
        <Link
          href="/mypage"
          className="group rounded-2xl border border-[var(--color-moss-100)] bg-white p-6 transition-all hover:border-[#5d6e4c] hover:shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0e9df] text-[#5d6e4c] transition-all group-hover:bg-[#5d6e4c] group-hover:text-white">
            <i className="fa-solid fa-user-gear text-xl" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-[#3a332d]">
            나만의 따뜻한 보관함
          </h3>
          <p className="text-xs leading-relaxed font-light text-gray-500">
            내가 작업 도중에 보관한 미완성 작품들과 소중하게 모은 쇼핑 도안
            리스트를 이곳에서 분류합니다.
          </p>
        </Link>
      </div>

      {/* 지금 핫한 도안 영역 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-[#3a332d]">
              <span className="h-6 w-1.5 rounded-full bg-[#5d6e4c]"></span>
              지금 가장 핫한 도안 🔥
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              도안동 아틀리에 주민들이 가장 많이 열람하고 구매한 인기 도안
            </p>
          </div>
          <Link
            href="/shopping"
            className="flex items-center gap-1 text-sm font-semibold text-[#5d6e4c] hover:text-[#465538]">
            전체 보기 <i className="fa-solid fa-chevron-right text-xs"></i>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {POPULAR_ITEMS.map(item => (
            <ShopItemCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
