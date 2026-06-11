'use client'

import React from 'react'
import { ShoppingItem } from '@/types'

export default function ShopItemCard({ item }: { item: ShoppingItem }) {
  return (
    <div className="border-moss-100 hover:border-moss-400 flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all hover:shadow-lg">
      <div className="border-moss-50 relative flex aspect-square items-center justify-center border-b bg-stone-50 p-6">
        <i className="fa-solid fa-mitten text-5xl text-[#5d6e4c]" />
        <span className="text-midnight border-moss-100 absolute top-3 left-3 rounded-md border bg-white/95 px-2 py-0.5 text-[10px] font-bold">
          {item.categoryText}
        </span>
      </div>
      <div className="flex flex-grow flex-col justify-between space-y-3 p-4">
        <div>
          <span className="block text-[10px] font-medium text-gray-400">
            {item.creator}
          </span>
          <h4 className="text-midnight mt-0.5 line-clamp-1 text-sm font-bold">
            {item.title}
          </h4>
        </div>
        <div className="flex items-center justify-between border-t border-gray-50 pt-2">
          <span className="text-midnight text-sm font-extrabold">
            {item.price.toLocaleString()} P
          </span>
          <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
            <i className="fa-solid fa-star" /> {item.rating}
          </span>
        </div>
      </div>
    </div>
  )
}
