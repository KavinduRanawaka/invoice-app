import React from 'react'
import { formatCurrency } from '../utils/pdfExport'
import styles from './InvoicePreview.module.css'

export default function InvoicePreview({ invoice, subtotal, taxAmount, total }) {
  const {
    logo, bizName, bizEmail, bizPhone, bizAddress,
    clientName, clientEmail, clientAddress,
    invoiceNumber, invoiceDate, dueDate,
    currency, taxRate, notes, items,
  } = invoice

  const fmt = (n) => formatCurrency(n, currency)

  return (
    <div className={styles.wrapper}>
      <div className={styles.invoice} id="invoice-preview">

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.brandBlock}>
            {logo && (
              <img src={logo} alt="Business logo" className={styles.logoImg} />
            )}
            <div className={styles.brand}>{bizName || 'Your Business'}</div>
            {bizEmail && <div className={styles.bizInfo}>{bizEmail}</div>}
            {bizPhone && <div className={styles.bizInfo}>{bizPhone}</div>}
            {bizAddress && (
              <div className={styles.bizInfo} style={{ whiteSpace: 'pre-line' }}>
                {bizAddress}
              </div>
            )}
          </div>
          <div className={styles.invoiceLabel}>INVOICE</div>
        </div>

        {/* Meta: Bill To + Invoice Info */}
        <div className={styles.meta}>
          <div className={styles.billTo}>
            <div className={styles.metaLabel}>Bill To</div>
            <div className={styles.clientName}>{clientName || '—'}</div>
            {clientEmail && <div className={styles.clientInfo}>{clientEmail}</div>}
            {clientAddress && (
              <div className={styles.clientInfo} style={{ whiteSpace: 'pre-line' }}>
                {clientAddress}
              </div>
            )}
          </div>
          <div className={styles.invoiceInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Invoice #</span>
              <span className={styles.infoValue}>{invoiceNumber || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Date</span>
              <span className={styles.infoValue}>{invoiceDate || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Due</span>
              <span className={styles.infoValue}>{dueDate || '—'}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Line Items Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thDesc}>Description</th>
              <th className={styles.thNum}>Qty</th>
              <th className={styles.thNum}>Rate</th>
              <th className={styles.thNum}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className={styles.emptyRow}>No items added yet</td>
              </tr>
            )}
            {items.map(item => (
              <tr key={item.id} className={styles.itemRow}>
                <td className={styles.tdDesc}>{item.description || '—'}</td>
                <td className={styles.tdNum}>{item.quantity}</td>
                <td className={styles.tdNum}>{fmt(item.rate)}</td>
                <td className={styles.tdNum}>{fmt(item.quantity * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          {taxRate > 0 && (
            <div className={styles.totalRow}>
              <span>Tax ({taxRate}%)</span>
              <span>{fmt(taxAmount)}</span>
            </div>
          )}
          <div className={styles.divider} style={{ margin: '10px 0 12px' }} />
          <div className={styles.grandTotal}>
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className={styles.notes}>
            <div className={styles.notesLabel}>Notes</div>
            <div className={styles.notesText}>{notes}</div>
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          Thank you for your business.
        </div>

      </div>
    </div>
  )
}
