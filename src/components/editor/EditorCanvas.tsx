'use client'

import React, { useRef } from 'react'
import { CellData, KnitSymbolType } from '@/types'

interface EditorCanvasProps {
  gridWidth: number
  gridHeight: number
  zoomLevel: number
  canvasGrid: CellData[]
  setCanvasGrid: React.Dispatch<React.SetStateAction<CellData[]>>
  selectedColor: string
  selectedSymbol: KnitSymbolType
  activeTool: 'pencil' | 'eraser' | 'hand'
  pushState: (newGrid: CellData[]) => void
}

export default function EditorCanvas({
  gridWidth,
  gridHeight,
  zoomLevel,
  canvasGrid,
  setCanvasGrid,
  selectedColor,
  selectedSymbol,
  activeTool,
  pushState
}: EditorCanvasProps) {
  const isDrawingRef = useRef<boolean>(false)

  // 개별 셀 채우기 로직 (Pencil vs Eraser)
  const paintCell = (index: number) => {
    if (activeTool === 'hand') return

    setCanvasGrid(prevGrid => {
      const nextGrid = prevGrid.map((cell, idx) => {
        if (idx !== index) return cell
        return activeTool === 'pencil'
          ? { symbol: selectedSymbol, color: selectedColor }
          : { symbol: 'empty' as KnitSymbolType, color: 'transparent' }
      })
      return nextGrid
    })
  }

  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    if (e.button !== 0 || activeTool === 'hand') return // 좌클릭만 허용
    pushState(canvasGrid) // 그리기 전 히스토리 보관
    isDrawingRef.current = true
    paintCell(index)
  }

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    // 마우스를 누른 채로 진입했을 때만 드로잉 트리거
    if (isDrawingRef.current && e.buttons === 1 && activeTool !== 'hand') {
      paintCell(index)
    }
  }

  const handleMouseUp = () => {
    isDrawingRef.current = false
  }

  // 배율 계산
  const baseCellSize = 32
  const scaledSize = baseCellSize * (zoomLevel / 100)

  const containerStyle: React.CSSProperties = {
    '--pixel-size': `${scaledSize}px`,
    width: `calc(${gridWidth} * var(--pixel-size))`,
    height: `calc(${gridHeight} * var(--pixel-size))`
  } as React.CSSProperties

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`
  }

  return (
    <div
      onMouseUp={handleMouseUp}
      style={containerStyle}
      className="border-moss-200 transparency-bg relative flex items-center justify-center overflow-hidden rounded-2xl border bg-white shadow-2xl transition-all duration-200 ease-out">
      {/* 직물 느낌을 자아내는 백그라운드 레이어 */}
      <div className="canvas-knit-texture" />

      {/* 그리기용 모눈 전경 레이어 */}
      <div
        style={gridStyle}
        className="relative z-10 grid h-full w-full overflow-hidden bg-transparent select-none">
        {canvasGrid.map((cell, index) => (
          <div
            key={index}
            onMouseDown={e => handleMouseDown(index, e)}
            onMouseEnter={e => handleMouseEnter(index, e)}
            className="border-moss-100/10 relative flex h-full w-full cursor-crosshair items-center justify-center border-r border-b transition-all duration-150">
            {cell.symbol !== 'empty' && (
              <span
                className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono font-extrabold select-none"
                style={{
                  color:
                    cell.color === 'transparent'
                      ? 'var(--color-midnight)'
                      : cell.color,
                  fontSize: `calc(${scaledSize}px * 0.65)`
                }}>
                {cell.symbol === 'knit'
                  ? '│'
                  : cell.symbol === 'purl'
                    ? '—'
                    : cell.symbol === 'yo'
                      ? '○'
                      : cell.symbol === 'k2tog'
                        ? '╱'
                        : cell.symbol === 'ssk'
                          ? '╲'
                          : cell.symbol === 'cable'
                            ? '✕'
                            : cell.symbol === 'slip'
                              ? '∨'
                              : ''}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
