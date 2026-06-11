'use client'

import React, { useState } from 'react'
import { KnitSymbolType } from '@/types'

interface ToolDockProps {
  activeTool: 'pencil' | 'eraser' | 'hand'
  setActiveTool: (tool: 'pencil' | 'eraser' | 'hand') => void
  selectedColor: string
  setSelectedColor: (color: string) => void
  selectedSymbol: KnitSymbolType
  setSelectedSymbol: (symbol: KnitSymbolType) => void
  gridWidth: number
  gridHeight: number
  onGridSizeChange: (w: number, h: number) => void
}

const PALETTE = [
  '#5d6e4c',
  '#3a332d',
  '#eadfc9',
  '#c65a43',
  '#a7b5bb',
  '#9c7a5f',
  '#d9a036',
  '#84b4b8',
  '#b0cfd1',
  '#1c3236'
]

const SYMBOLS_INFO: Record<KnitSymbolType, { label: string; char: string }> = {
  empty: { label: '메리야스', char: ' ' },
  knit: { label: '겉뜨기', char: '│' },
  purl: { label: '안뜨기', char: '—' },
  yo: { label: '바늘비우기', char: '○' },
  k2tog: { label: '오른코겹치기', char: '╱' },
  ssk: { label: '왼코겹치기', char: '╲' },
  cable: { label: '교차뜨기', char: '✕' },
  slip: { label: '걸러뜨기', char: '∨' }
}

export default function ToolDock({
  activeTool,
  setActiveTool,
  selectedColor,
  setSelectedColor,
  selectedSymbol,
  setSelectedSymbol,
  gridWidth,
  gridHeight,
  onGridSizeChange
}: ToolDockProps) {
  const [showColorPopover, setShowColorPopover] = useState(false)

  return (
    <div className="border-moss-100 absolute top-4 bottom-4 left-4 z-20 flex w-24 flex-col items-center justify-between overflow-visible rounded-2xl border bg-white/95 py-4 shadow-xl backdrop-blur-md">
      {/* 1. 도구박스 (2열 격자 배치) */}
      <div className="flex w-full shrink-0 flex-col items-center gap-3">
        <span className="text-[9px] font-extrabold tracking-wider text-gray-400 uppercase">
          TOOLS
        </span>
        <div className="grid w-full grid-cols-2 gap-1.5 px-2">
          <button
            onClick={() => setActiveTool('pencil')}
            className={`flex h-10 flex-col items-center justify-center gap-0.5 rounded-xl transition-all ${activeTool === 'pencil' ? 'bg-moss-400 scale-105 font-bold text-white' : 'hover:bg-moss-50 text-gray-500'}`}>
            <i className="fa-solid fa-stamp text-xs" />
            <span className="text-[8px] font-bold">도장찍기</span>
          </button>
          <button
            onClick={() => setActiveTool('eraser')}
            className={`flex h-10 flex-col items-center justify-center gap-0.5 rounded-xl transition-all ${activeTool === 'eraser' ? 'bg-moss-400 scale-105 font-bold text-white' : 'hover:bg-moss-50 text-gray-500'}`}>
            <i className="fa-solid fa-eraser text-xs" />
            <span className="text-[8px] font-bold">기호지움</span>
          </button>
          <button
            onClick={() => setActiveTool('hand')}
            className={`flex h-10 flex-col items-center justify-center gap-0.5 rounded-xl transition-all ${activeTool === 'hand' ? 'bg-moss-400 scale-105 font-bold text-white' : 'hover:bg-moss-50 text-gray-500'}`}>
            <i className="fa-solid fa-hand text-xs" />
            <span className="text-[8px] font-bold">화면이동</span>
          </button>
        </div>
      </div>

      {/* 2. 포토샵형 툴팁 팝오버 실 선택기 */}
      <div className="border-moss-50 relative flex w-full shrink-0 flex-col items-center gap-1.5 overflow-visible border-t pt-3">
        <span className="text-[9px] font-extrabold tracking-wider text-gray-400 uppercase">
          YARN COLOR
        </span>
        <div className="w-full px-2">
          <button
            onClick={e => {
              e.stopPropagation()
              setShowColorPopover(!showColorPopover)
            }}
            className="border-moss-100 hover:bg-moss-50 relative flex h-12 w-full flex-col items-center justify-center gap-0.5 rounded-xl border bg-white shadow-sm transition-all active:scale-95">
            <i className="fa-solid fa-palette text-terracotta text-xs" />
            <span className="text-[8px] font-bold">실 색상</span>
            <span
              className="absolute right-1 bottom-1 h-2.5 w-2.5 rounded-full border border-white"
              style={{ backgroundColor: selectedColor }}
            />
          </button>
        </div>

        {/* 팝오버 툴팁 */}
        {showColorPopover && (
          <div className="border-moss-100 popover-arrow absolute top-0 left-24 z-40 w-48 space-y-2.5 rounded-2xl border bg-white p-3.5 shadow-2xl transition-all select-none">
            <span className="block text-[9px] font-bold tracking-wider text-gray-400">
              실 색상 선택
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {PALETTE.map(color => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setShowColorPopover(false)
                  }}
                  className={`h-6 w-6 rounded-full border border-gray-300 transition-all hover:scale-110 active:scale-95 ${selectedColor === color ? 'ring-moss-400 ring-2 ring-offset-1' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="border-moss-50 border-t pt-1 text-center font-mono text-[8px] text-gray-400 uppercase">
              HEX: {selectedColor}
            </div>
          </div>
        )}
      </div>

      {/* 3. 대바늘 기호 팔레트 */}
      <div className="border-moss-50 flex w-full flex-col items-center gap-2 overflow-y-auto border-t pt-3">
        <span className="text-[9px] font-extrabold tracking-wider text-gray-400 uppercase">
          SYMBOLS
        </span>
        <div className="grid grid-cols-2 gap-1.5 px-2">
          {Object.entries(SYMBOLS_INFO).map(([key, info]) => {
            const isSelected = selectedSymbol === key && activeTool === 'pencil'
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedSymbol(key as KnitSymbolType)
                  setActiveTool('pencil')
                }}
                className={`text-midnight relative flex h-10 w-10 flex-col items-center justify-center gap-0.5 rounded-xl border transition-all active:scale-95 ${isSelected ? 'border-moss-400 bg-moss-50 text-moss-500 scale-105 font-bold shadow-sm' : 'border-moss-100 hover:bg-moss-50 text-gray-500'}`}
                title={info.label}>
                <span className="font-mono text-sm font-extrabold">
                  {info.char === '' ? ' ' : info.char}
                </span>
                <span className="max-w-full truncate px-0.5 text-[7px] font-bold">
                  {info.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. 규격 레인지 컨트롤러 */}
      <div className="border-moss-50 flex w-full shrink-0 flex-col items-center gap-2 border-t pt-3">
        <span className="text-[9px] font-extrabold tracking-wider text-gray-400 uppercase">
          GRID SIZE
        </span>
        <div className="flex w-full flex-col gap-1 px-2">
          <div className="bg-moss-50/70 border-moss-100 flex items-center justify-between rounded-xl border px-1.5 py-1">
            <span className="text-[8px] font-bold text-gray-400">가로</span>
            <input
              type="number"
              min="2"
              max="64"
              value={gridWidth}
              onChange={e =>
                onGridSizeChange(parseInt(e.target.value) || 16, gridHeight)
              }
              className="text-midnight w-10 bg-transparent text-right text-xs font-extrabold focus:outline-none"
            />
          </div>
          <div className="bg-moss-50/70 border-moss-100 flex items-center justify-between rounded-xl border px-1.5 py-1">
            <span className="text-[8px] font-bold text-gray-400">세로</span>
            <input
              type="number"
              min="2"
              max="64"
              value={gridHeight}
              onChange={e =>
                onGridSizeChange(gridWidth, parseInt(e.target.value) || 16)
              }
              className="text-midnight w-10 bg-transparent text-right text-xs font-extrabold focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
