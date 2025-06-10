
export interface Card {
  id: number
  title: string
  description: string
  tags?: string[]
  checkboxes?: { label: string; checked: boolean }[]
  links?: string[]
  images?: string[]
}

export interface List {
  id: number
  title: string
  cards: Card[]
}
