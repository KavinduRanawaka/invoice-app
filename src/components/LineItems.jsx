import React from 'react'
import { formatCurrency } from '../utils/pdfExport'
import styles from './LineItems.module.css'

export default function LineItems({ items, currency, onAdd, onRemove, onUpdate }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <span>Description</span>
        <span>Qty</span>
        <span>Rate</span>
        <span>Amount</span>
        <span />
      </div>

      {items.map(item => (
        <div key={item.id} className={styles.itemRow}>
          <input
            value={item.description}
            onChange={e => onUpdate(item.id, 'description', e.target.value)}
            placeholder="Service description"
          />
          <input
            type="number"
            min="0"
            value={item.quantity}
            onChange={e => onUpdate(item.id, 'quantity', parseFloat(e.target.value) || 0)}
          />
          <input
            type="number"
            min="0"
            step="0.01"
            value={item.rate}
            onChange={e => onUpdate(item.id, 'rate', parseFloat(e.target.value) || 0)}
          />
          <span className={styles.amount}>
            {formatCurrency(item.quantity * item.rate, currency)}
          </span>
          <button
            className={styles.removeBtn}
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
          >
            ✕
          </button>
        </div>
      ))}

      <button className={styles.addBtn} onClick={onAdd}>
        + Add Item
      </button>
    </div>
  )
}
