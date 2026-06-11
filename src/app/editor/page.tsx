'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from '@/hooks/useHistory'
import { CellData, KnitSymbolType } from '@/types'
import ToolDock from '@/components/editor/ToolDock'
import Inspector from '@/components/editor/Inspector'
import EditorCanvas from '@/components/editor/EditorCanvas'

export default function EditorPage() {
  const [gridWidth, setGridWidth] = useState<number>(16)
  const [gridHeight, setGridHeight] = useState<number>(16)
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [selectedColor, setSelectedColor] = useState<string>('#5d6e4c')
  const [selectedSymbol, setSelectedSymbol] = useState<KnitSymbolType>('knit')
  const [activeTool, setActiveTool] = useState<'pencil' | 'eraser' | 'hand'>(
    'pencil'
  )
  const [isRightPanelOpen, setIsRightPanelOpen] = useState<boolean>(true)

  // 초기 격자 데이터 생성
  const createEmptyGrid = (w: number, h: number): CellData[] => {
    return Array(w * h)
      .fill(null)
      .map(() => ({ symbol: 'empty', color: 'transparent' }))
  }

  // 실행 취소 및 상태 제어를 훅에 위임
  const {
    state: canvasGrid,
    setState: setCanvasGrid,
    pushState,
    undo,
    redo,
    resetHistory
  } = useHistory(createEmptyGrid(16, 16))

  const viewportRef = useRef<HTMLDivElement>(null)
  const isPanningRef = useRef(false)
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 })

  // 키보드 단축키 이벤트 바인딩 (Ctrl + Z / Ctrl + Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === 'z') {
          e.preventDefault()
          if (e.shiftKey) redo()
          else undo()
        } else if (e.key.toLowerCase() === 'y') {
          e.preventDefault()
          redo()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  // 모눈 가로/세로 크기 변경 핸들러
  const handleGridSizeChange = (w: number, h: number) => {
    pushState(createEmptyGrid(w, h))
    setGridWidth(w)
    setGridHeight(h)
    setTimeout(centerCanvas, 50)
  }

  // 손바닥(Hand) 도구를 사용한 캔버스 이동 정렬
  const centerCanvas = () => {
    const viewport = viewportRef.current
    if (viewport) {
      viewport.scrollLeft = (4000 - viewport.clientWidth) / 2
      viewport.scrollTop = (4000 - viewport.clientHeight) / 2
    }
  }

  useEffect(() => {
    centerCanvas()
  }, [])

  // 손바닥 패닝 mousedown 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool !== 'hand' || !viewportRef.current) return
    isPanningRef.current = true
    viewportRef.current.style.cursor = 'grabbing'
    panStartRef.current = {
      x: e.pageX - viewportRef.current.offsetLeft,
      y: e.pageY - viewportRef.current.offsetTop,
      scrollLeft: viewportRef.current.scrollLeft,
      scrollTop: viewportRef.current.scrollTop
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanningRef.current || activeTool !== 'hand' || !viewportRef.current)
      return
    e.preventDefault()
    const x = e.pageX - viewportRef.current.offsetLeft
    const y = e.pageY - viewportRef.current.offsetTop
    const walkX = (x - panStartRef.current.x) * 2
    const walkY = (y - panStartRef.current.y) * 2
    viewportRef.current.scrollLeft = panStartRef.current.scrollLeft - walkX
    viewportRef.current.scrollTop = panStartRef.current.scrollTop - walkY
  }

  const handleMouseUpOrLeave = () => {
    if (isPanningRef.current && viewportRef.current) {
      isPanningRef.current = false
      viewportRef.current.style.cursor = 'grab'
    }
  }

  // 샘플 프리셋 로드 핸들러
  const handleLoadPreset = (presetName: 'heart' | 'clover') => {
    pushState(createEmptyGrid(16, 16))
    setGridWidth(16)
    setGridHeight(16)

    const presetIndices =
      presetName === 'heart' ? PRESETS.heart : PRESETS.clover
    const nextGrid = createEmptyGrid(16, 16)
    presetIndices.forEach(idx => {
      nextGrid[idx] = { symbol: selectedSymbol, color: selectedColor }
    })
    setCanvasGrid(nextGrid)
    setTimeout(centerCanvas, 50)
  }

  return (
    <div className="bg-moss-50/50 flex h-screen flex-grow flex-col overflow-hidden select-none">
      {/* 1. 최상단 양방향 히스토리 플로팅 바 (zIndex: 30) */}
      <div className="border-moss-100 absolute top-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-2xl border bg-white/95 p-1.5 shadow-xl backdrop-blur">
        <button
          onClick={undo}
          className="hover:bg-moss-50 text-midnight flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all active:scale-95">
          <i className="fa-solid fa-arrow-rotate-left text-moss-400"></i>
          <span>실행 취소</span>
        </button>
        <div className="bg-moss-200 h-4 w-[1px]" />
        <button
          onClick={redo}
          className="hover:bg-moss-50 text-midnight flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all active:scale-95">
          <span>다시 실행</span>
          <i className="fa-solid fa-arrow-rotate-right text-moss-400"></i>
        </button>
      </div>

      {/* 2. 에디터 캔버스 작업 대지 - zIndex 10 바탕 배치 */}
      <div
        ref={viewportRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`absolute inset-0 z-10 flex overflow-auto select-none ${activeTool === 'hand' ? 'cursor-grab' : 'cursor-default'}`}>
        <div className="relative flex h-[4000px] w-[4000px] shrink-0 items-center justify-center">
          <EditorCanvas
            gridWidth={gridWidth}
            gridHeight={gridHeight}
            zoomLevel={zoomLevel}
            canvasGrid={canvasGrid}
            setCanvasGrid={setCanvasGrid}
            selectedColor={selectedColor}
            selectedSymbol={selectedSymbol}
            activeTool={activeTool}
            pushState={pushState}
          />
        </div>
      </div>

      {/* 3. 좌측 플로팅 툴독 (zIndex: 20) */}
      <ToolDock
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSymbol={selectedSymbol}
        setSelectedSymbol={setSelectedSymbol}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        onGridSizeChange={handleGridSizeChange}
      />

      {/* 4. 우측 플로팅 인스펙터 (zIndex: 20) */}
      <Inspector
        isOpen={isRightPanelOpen}
        setIsOpen={setIsRightPanelOpen}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        onLoadPreset={handleLoadPreset}
      />

      {/* 5. 하단 줌 배율 제어바 (zIndex: 30) */}
      <div className="border-moss-100 absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 rounded-2xl border bg-white/90 p-2.5 text-xs shadow-xl backdrop-blur">
        <span className="font-semibold text-gray-400">
          <i className="fa-solid fa-arrows-up-down-left-right mr-1"></i> 화면
          이동 도구 지원
        </span>
        <div className="bg-moss-50/50 border-moss-100/40 flex items-center gap-1 rounded-xl border p-0.5">
          <button
            onClick={() => setZoomLevel(prev => Math.max(25, prev - 25))}
            className="hover:bg-moss-100 flex h-5 w-5 items-center justify-center rounded-lg text-gray-600 transition-colors">
            <i className="fa-solid fa-magnifying-glass-minus text-[10px]"></i>
          </button>
          <span className="w-12 text-center font-bold text-gray-600">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(400, prev + 25))}
            className="hover:bg-moss-100 flex h-5 w-5 items-center justify-center rounded-lg text-gray-600 transition-colors">
            <i className="fa-solid fa-magnifying-glass-plus text-[10px]"></i>
          </button>
          <div className="bg-moss-200 mx-0.5 h-3 w-[1px]" />
          <button
            onClick={() => setZoomLevel(100)}
            className="hover:bg-moss-100 flex h-5 items-center justify-center rounded-lg px-1.5 text-[9px] font-bold text-gray-500">
            100%
          </button>
        </div>
      </div>
    </div>
  )
}

const PRESETS = {
  heart: [
    18, 19, 21, 22, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 41, 42, 43,
    44, 45, 46, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 61, 62, 63, 64, 65, 66,
    67, 68, 69, 70, 71, 72, 73, 74, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
    88, 89, 90, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
    110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 127, 128, 129,
    130, 131, 132, 133, 134, 135, 136, 144, 145, 146, 147, 148, 149, 150, 151,
    161, 162, 163, 164, 165, 166, 178, 179, 180, 181, 195, 196
  ],
  clover: [
    38, 39, 41, 42, 53, 54, 55, 56, 57, 58, 68, 69, 70, 71, 72, 73, 74, 75, 82,
    83, 84, 85, 86, 87, 88, 89, 90, 91, 99, 100, 101, 102, 103, 104, 105, 106,
    107, 108, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 131, 132, 133,
    134, 135, 136, 137, 138, 149, 150, 151, 152, 153, 154, 167, 168, 182, 183,
    198
  ]
}
