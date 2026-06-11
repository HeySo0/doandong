'use client'

import React from 'react'

interface InspectorProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  gridWidth: number
  gridHeight: number
  onLoadPreset: (presetName: 'heart' | 'clover') => void
}

export default function Inspector({
  isOpen,
  setIsOpen,
  gridWidth,
  gridHeight,
  onLoadPreset
}: InspectorProps) {
  // 면적 별 추천 제작 소요시간 환산
  const getEstimatedTime = () => {
    const minutes = Math.round(gridWidth * gridHeight * 0.6)
    const hours = Math.floor(minutes / 60)
    const remainingMins = minutes % 60
    return hours > 0
      ? `약 ${hours}시간 ${remainingMins}분`
      : `약 ${remainingMins}분`
  }

  return (
    <div
      className={`border-moss-100 absolute top-4 right-4 bottom-4 z-20 flex w-72 flex-col justify-between rounded-2xl border bg-white/95 shadow-xl backdrop-blur-md transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-[280px]'}`}>
      {/* 접이식 컨트롤 탭 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-moss-100 hover:border-moss-400 hover:text-moss-400 absolute top-1/2 -left-7 flex h-16 w-7 -translate-y-1/2 items-center justify-center rounded-l-xl border border-r-0 bg-white text-xs shadow-md transition-all">
        <i
          className={`fa-solid ${isOpen ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-500`}
        />
      </button>

      {/* 속성 컨텐츠 영역 */}
      <div
        className={`flex h-full flex-col justify-between space-y-6 overflow-y-auto p-5 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-5">
          <span className="text-midnight border-moss-100 flex items-center gap-2 border-b pb-2 text-xs font-bold tracking-wider uppercase">
            <i className="fa-solid fa-sliders text-terracotta" /> 도안 속성 설정
          </span>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-500">
                도안 타이틀
              </label>
              <input
                type="text"
                defaultValue="도안동 숲길 코지 머플러"
                className="border-moss-100 focus:ring-moss-400 bg-moss-50/50 w-full rounded-xl border px-3 py-2 text-xs text-gray-700 focus:ring-1 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-500">
                카테고리 구분
              </label>
              <select className="border-moss-100 focus:ring-moss-400 w-full rounded-xl border bg-white px-3 py-2 text-xs text-gray-700 focus:ring-1 focus:outline-none">
                <option value="knitting">손뜨개 / 대바늘 / 코바늘</option>
                <option value="cross-stitch">십자수 (Cross Stitch)</option>
                <option value="beads">프랑스 자수 / 자카드</option>
                <option value="pixel">기타 픽셀 비즈 / DIY 도안</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-500">
                이웃 공개 권한
              </label>
              <div className="flex gap-4 pt-1">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-600">
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    defaultChecked
                    className="accent-moss-400"
                  />{' '}
                  전체공개
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-600">
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    className="accent-moss-400"
                  />{' '}
                  나만보기
                </label>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="block text-[11px] font-bold text-gray-500">
                예상 도안 설계 정보
              </span>
              <div className="bg-moss-50/70 border-moss-100 text-midnight space-y-1.5 rounded-xl border p-3.5 text-xs">
                <div className="flex justify-between">
                  <span>격자 면적</span>{' '}
                  <span className="font-mono font-bold">
                    {gridWidth * gridHeight} px ({gridWidth}x{gridHeight})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>추천 소요시간</span> <span>{getEstimatedTime()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 미니 프리셋 보드 */}
        <div className="border-moss-50 space-y-3 border-t pt-4">
          <span className="block text-[11px] font-bold text-gray-400 uppercase">
            미니 패턴 샘플 채우기
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onLoadPreset('heart')}
              className="hover:bg-moss-50 bg-moss-50/30 border-moss-100 flex items-center justify-center gap-1 rounded-lg border px-1 py-2 text-center text-[10px] font-bold text-gray-600 transition-all">
              <span>❤️ 하트</span>
            </button>
            <button
              onClick={() => onLoadPreset('clover')}
              className="hover:bg-moss-50 bg-moss-50/30 border-moss-100 flex items-center justify-center gap-1 rounded-lg border px-1 py-2 text-center text-[10px] font-bold text-gray-600 transition-all">
              <span>🍀 클로버</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
