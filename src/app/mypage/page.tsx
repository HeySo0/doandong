'use client'

import React, { useState } from 'react'
import { DraftItem } from '@/types'

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<'mine' | 'purchased'>('mine')

  // 가변형 크기 도안 저장 테스트 데이터스미스
  const [myDrafts] = useState<DraftItem[]>([
    {
      id: 'my-1',
      title: '미니 테라코타 트리 (3x4)',
      category: 'knitting',
      categoryText: '손뜨개',
      gridWidth: 3,
      gridHeight: 4,
      date: '2026.06.11',
      gridData: [
        { symbol: 'empty', color: 'transparent' },
        { symbol: 'knit', color: '#c65a43' },
        { symbol: 'empty', color: 'transparent' },
        { symbol: 'knit', color: '#5d6e4c' },
        { symbol: 'knit', color: '#5d6e4c' },
        { symbol: 'knit', color: '#5d6e4c' },
        { symbol: 'knit', color: '#5d6e4c' },
        { symbol: 'yo', color: '#d9a036' },
        { symbol: 'knit', color: '#5d6e4c' },
        { symbol: 'empty', color: 'transparent' },
        { symbol: 'purl', color: '#3a332d' },
        { symbol: 'empty', color: 'transparent' }
      ]
    }
  ])

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* 프로필 요약 카드 */}
      <div className="border-moss-100 overflow-hidden rounded-3xl border bg-white shadow-sm">
        <div className="from-moss-400/20 to-moss-500/10 relative h-32 bg-gradient-to-r" />
        <div className="relative flex flex-col items-center gap-5 p-6 pt-0 sm:flex-row sm:items-end">
          <div className="relative z-10 -mt-12 h-24 w-24 shrink-0 rounded-2xl border-2 border-[#5d6e4c] bg-white p-1.5 shadow-md">
            <img
              src="[https://placehold.co/150x150/5d6e4c/ffffff?text=Creator](https://placehold.co/150x150/5d6e4c/ffffff?text=Creator)"
              alt="Avatar"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
          <div className="flex-grow space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h3 className="text-midnight text-xl font-bold">김도안</h3>
              <span className="rounded-full bg-[#5d6e4c] px-2.5 py-0.5 text-[10px] font-bold text-white">
                동네 장인
              </span>
            </div>
            <p className="text-xs text-gray-500">
              따스한 양모 실 짜는 소리를 무척 아끼는 아틀리에 주인장입니다. 🍀
            </p>
          </div>
        </div>
      </div>

      {/* 동적 도안 그리드 복원기 */}
      <div className="space-y-6">
        <div className="border-moss-100 flex border-b">
          <button
            onClick={() => setActiveTab('mine')}
            className={`border-b-2 px-6 py-3 text-sm font-bold transition-all ${activeTab === 'mine' ? 'border-[#5d6e4c] text-[#5d6e4c]' : 'border-transparent text-gray-400'}`}>
            내가 그린 도안
          </button>
        </div>

        {activeTab === 'mine' && (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {myDrafts.map(draft => (
              <div
                key={draft.id}
                className="border-moss-100 flex flex-col justify-between space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
                {/* 동적 비례 픽셀 렌더러 */}
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2 shadow-inner">
                  <div
                    className="grid gap-[1px] bg-[#eadfc9]/55"
                    style={{
                      gridTemplateColumns: `repeat(${draft.gridWidth}, minmax(0, 1fr))`,
                      aspectRatio: `${draft.gridWidth} / ${draft.gridHeight}`,
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}>
                    {draft.gridData.map((cell, idx) => (
                      <div
                        key={idx}
                        style={{ backgroundColor: cell.color }}
                        className="relative flex h-full w-full items-center justify-center border border-black/5">
                        <span
                          className="absolute font-mono text-[6px] font-extrabold"
                          style={{ color: '#3a332d' }}>
                          {cell.symbol === 'knit'
                            ? '│'
                            : cell.symbol === 'purl'
                              ? '—'
                              : cell.symbol === 'yo'
                                ? '○'
                                : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="bg-moss-400 rounded px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
                    {draft.categoryText}
                  </span>
                  <h4 className="text-midnight mt-1.5 truncate text-xs font-bold">
                    {draft.title}
                  </h4>
                  <span className="mt-0.5 block text-[10px] text-gray-400">
                    {draft.date} 저장됨 ({draft.gridWidth}x{draft.gridHeight})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
