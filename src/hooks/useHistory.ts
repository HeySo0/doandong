'use client'

import { useState, useCallback } from 'react'
import { CellData } from '@/types'

export function useHistory(initialPresent: CellData[]) {
  const [present, setPresent] = useState<CellData[]>(initialPresent)
  const [past, setPast] = useState<CellData[][]>([])
  const [future, setFuture] = useState<CellData[][]>([])

  // 상태 유틸리티: CellData 배열 깊은 복사
  const cloneGrid = (grid: CellData[]): CellData[] => {
    return grid.map(cell => ({ ...cell }))
  }

  // 새로운 획이나 상태 변경이 일어났을 때 기록 저장
  const pushState = useCallback(
    (newGrid: CellData[]) => {
      setPast(prevPast => {
        const nextPast = [...prevPast, cloneGrid(present)]
        if (nextPast.length > 50) nextPast.shift() // 스택 크기 제한 (최대 50개)
        return nextPast
      })
      setPresent(cloneGrid(newGrid))
      setFuture([]) // 새로운 행동 발생 시 Redo 스택 비우기
    },
    [present]
  )

  // 실행 취소 (Undo)
  const undo = useCallback(() => {
    if (past.length === 0) return false

    const previous = past[past.length - 1]
    const newPast = past.slice(0, past.length - 1)

    setFuture(prevFuture => [...prevFuture, cloneGrid(present)])
    setPresent(cloneGrid(previous))
    setPast(newPast)
    return true
  }, [past, present])

  // 다시 실행 (Redo)
  const redo = useCallback(() => {
    if (future.length === 0) return false

    const next = future[future.length - 1]
    const newFuture = future.slice(0, future.length - 1)

    setPast(prevPast => [...prevPast, cloneGrid(present)])
    setPresent(cloneGrid(next))
    setFuture(newFuture)
    return true
  }, [future, present])

  // 전체 초기화
  const resetHistory = useCallback((newInitial: CellData[]) => {
    setPresent(cloneGrid(newInitial))
    setPast([])
    setFuture([])
  }, [])

  return {
    state: present,
    setState: setPresent,
    pushState,
    undo,
    redo,
    resetHistory,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    historyLength: past.length
  }
}
