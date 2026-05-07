import { useState } from 'react'

const today = new Date().toISOString().split('T')[0]
const dueDate = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]

const defaultInvoice = {
  // Sender
  logo: null,
  bizName: '',
  bizEmail: '',
  bizPhone: '',
  bizAddress: '',
  // Client
  clientName: '',
  clientEmail: '',
  clientAddress: '',
  // Invoice meta
  invoiceNumber: 'INV-001',
  invoiceDate: today,
  dueDate: dueDate,
  currency: '$',
  // Financials
  taxRate: 0,
  notes: '',
  // Items
  items: [
    { id: 1, description: 'Web Design', quantity: 1, rate: 1200 },
    { id: 2, description: 'Development', quantity: 3, rate: 400 },
  ],
}

let nextId = 3

export function useInvoice() {
  const [invoice, setInvoice] = useState(defaultInvoice)

  const update = (field, value) => {
    setInvoice(prev => ({ ...prev, [field]: value }))
  }

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: nextId++, description: '', quantity: 1, rate: 0 },
      ],
    }))
  }

  const removeItem = (id) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }))
  }

  const updateItem = (id, field, value) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
  }

  // Computed values
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.rate, 0
  )
  const taxAmount = subtotal * (invoice.taxRate / 100)
  const total = subtotal + taxAmount

  return {
    invoice,
    update,
    addItem,
    removeItem,
    updateItem,
    subtotal,
    taxAmount,
    total,
  }
}
