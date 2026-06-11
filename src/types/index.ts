export type KnitSymbolType =
  | 'empty'
  | 'knit'
  | 'purl'
  | 'yo'
  | 'k2tog'
  | 'ssk'
  | 'cable'
  | 'slip'

export interface SymbolInfo {
  label: string
  icon: string
  char: string
}

export interface CellData {
  symbol: KnitSymbolType
  color: string // Hex code or CSS variable
}

export interface DraftItem {
  id: string
  title: string
  category: string
  categoryText: string
  gridWidth: number
  gridHeight: number
  gridData: CellData[]
  date: string
}

export interface ShoppingItem {
  id: string
  title: string
  category: string
  categoryText: string
  creator: string
  price: number
  rating: number
  isPurchased: boolean
  desc: string
}
