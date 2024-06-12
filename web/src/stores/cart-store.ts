import { create } from 'zustand'

export type TransactionItems = {
  id: string
  price: number
  quantity: number
  capacity: number | null | undefined
  type: 'REGULER' | 'VIP'
}

type State = { items: TransactionItems[] }

type CartAction = {
  addItems: (items: TransactionItems[]) => void
  incQty: (id: string) => void
  decQty: (id: string) => void
  delItem: (id: string) => void
  fetchData: () => Promise<void>
}

export type CartStore = State & CartAction

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItems: (items) => {
    const cart = get().items
    const cartItem = cart.find((item, idx) => item.id === items[idx].id)

    if (cartItem) {
      return set((state) => ({
        items: state.items.map((item) => (item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item)),
      }))
    } else {
      return set((state) => ({ items: [...state.items, ...items] }))
    }
  },
  incQty: (id) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    })),
  decQty: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, item.capacity || 0) } : item,
      ),
    })),
  delItem: (id) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item)),
    })),
  fetchData: async () => {
    const items = get().items
  },
}))
