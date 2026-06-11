'use client'

import React, { useState } from 'react'
import ShopItemCard from '@/components/shopping/ShopItemCard'
import { ShoppingItem } from '@/types'

const INITIAL_ITEMS: ShoppingItem[] = [
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

export default function ShoppingPage() {
  const [items, setItems] = useState<ShoppingItem[]>(INITIAL_ITEMS)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  const filteredItems = items.filter(item => {
    const matchCat =
      activeCategory === 'all' || item.category === activeCategory
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-midnight text-2xl font-bold">도안 쇼핑 마켓</h2>
          <p className="mt-1 text-xs text-gray-500">
            뜨개인들이 엄격하게 감수하고 창작한 내 취향의 일러스트 패턴 모음
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border-moss-100 focus:ring-moss-400 w-full rounded-xl border bg-white px-10 py-3 text-xs text-gray-700 shadow-sm focus:ring-1 focus:outline-none"
          />
          <i className="fa-solid fa-magnifying-glass text-moss-300 absolute top-3.5 left-3.5 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {filteredItems.map(item => (
          <ShopItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}
