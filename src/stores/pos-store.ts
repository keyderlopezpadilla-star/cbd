import { create } from 'zustand'
import { SaleItem } from '@/types'
import { DEFAULT_TAX_RATE } from '@/lib/constants'
import { PaymentMethod } from '@/lib/mock-data/sales'

export interface CartItem extends SaleItem {
  id: string
}

export interface CartDiscount {
  type: 'percentage' | 'fixed'
  value: number
  label: string
}

interface POSState {
  // Cart State
  items: CartItem[]
  cartDiscount: CartDiscount | null
  customerId: string | null
  customerName: string | null

  // Payment State
  paymentMethod: PaymentMethod | null
  cashReceived: number
  cardAmount: number
  cashAmount: number

  // Computed values
  subtotal: number
  discountAmount: number
  taxAmount: number
  total: number

  // Actions
  addItem: (product: { id: string; name: string; price: number }) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateItemDiscount: (productId: string, discount: number) => void
  setCartDiscount: (discount: CartDiscount | null) => void
  setCustomer: (id: string | null, name: string | null) => void
  setPaymentMethod: (method: PaymentMethod | null) => void
  setCashReceived: (amount: number) => void
  setCashAmount: (amount: number) => void
  setCardAmount: (amount: number) => void
  clearCart: () => void
  calculateTotals: () => void
}

function calculateCartTotals(items: CartItem[], cartDiscount: CartDiscount | null) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)

  let discountAmount = 0
  if (cartDiscount) {
    if (cartDiscount.type === 'percentage') {
      discountAmount = subtotal * (cartDiscount.value / 100)
    } else {
      discountAmount = cartDiscount.value
    }
  }

  // Also add per-item discounts
  const itemDiscounts = items.reduce((sum, item) => sum + (item.discount * item.quantity), 0)
  discountAmount += itemDiscounts

  const taxableAmount = subtotal - discountAmount
  const taxAmount = taxableAmount * (DEFAULT_TAX_RATE / 100)
  const total = taxableAmount + taxAmount

  return { subtotal, discountAmount, taxAmount, total: Math.max(0, total) }
}

export const usePOSStore = create<POSState>((set, get) => ({
  // Initial State
  items: [],
  cartDiscount: null,
  customerId: null,
  customerName: null,
  paymentMethod: null,
  cashReceived: 0,
  cardAmount: 0,
  cashAmount: 0,
  subtotal: 0,
  discountAmount: 0,
  taxAmount: 0,
  total: 0,

  // Actions
  addItem: (product) => {
    const state = get()
    const existingItem = state.items.find((item) => item.productId === product.id)

    let newItems: CartItem[]
    if (existingItem) {
      newItems = state.items.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.price - item.discount * (item.quantity + 1),
            }
          : item
      )
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        discount: 0,
        total: product.price,
      }
      newItems = [...state.items, newItem]
    }

    const totals = calculateCartTotals(newItems, state.cartDiscount)
    set({ items: newItems, ...totals })
  },

  removeItem: (productId) => {
    const state = get()
    const newItems = state.items.filter((item) => item.productId !== productId)
    const totals = calculateCartTotals(newItems, state.cartDiscount)
    set({ items: newItems, ...totals })
  },

  updateQuantity: (productId, quantity) => {
    const state = get()
    if (quantity <= 0) {
      const newItems = state.items.filter((item) => item.productId !== productId)
      const totals = calculateCartTotals(newItems, state.cartDiscount)
      set({ items: newItems, ...totals })
      return
    }

    const newItems = state.items.map((item) =>
      item.productId === productId
        ? { ...item, quantity, total: quantity * item.price - item.discount * quantity }
        : item
    )
    const totals = calculateCartTotals(newItems, state.cartDiscount)
    set({ items: newItems, ...totals })
  },

  updateItemDiscount: (productId, discount) => {
    const state = get()
    const newItems = state.items.map((item) =>
      item.productId === productId
        ? { ...item, discount, total: item.quantity * item.price - discount * item.quantity }
        : item
    )
    const totals = calculateCartTotals(newItems, state.cartDiscount)
    set({ items: newItems, ...totals })
  },

  setCartDiscount: (discount) => {
    const state = get()
    const totals = calculateCartTotals(state.items, discount)
    set({ cartDiscount: discount, ...totals })
  },

  setCustomer: (id, name) => {
    set({ customerId: id, customerName: name })
  },

  setPaymentMethod: (method) => {
    set({ paymentMethod: method })
  },

  setCashReceived: (amount) => {
    set({ cashReceived: amount })
  },

  setCashAmount: (amount) => {
    set({ cashAmount: amount })
  },

  setCardAmount: (amount) => {
    set({ cardAmount: amount })
  },

  clearCart: () => {
    set({
      items: [],
      cartDiscount: null,
      customerId: null,
      customerName: null,
      paymentMethod: null,
      cashReceived: 0,
      cardAmount: 0,
      cashAmount: 0,
      subtotal: 0,
      discountAmount: 0,
      taxAmount: 0,
      total: 0,
    })
  },

  calculateTotals: () => {
    const state = get()
    const totals = calculateCartTotals(state.items, state.cartDiscount)
    set(totals)
  },
}))
