import React from 'react'
import LineItems from './LineItems'
import LogoUpload from './LogoUpload'
import styles from './InvoiceForm.module.css'

const CURRENCIES = [
  { value: '$', label: 'USD ($)' },
  { value: '€', label: 'EUR (€)' },
  { value: '£', label: 'GBP (£)' },
  { value: 'LKR', label: 'LKR' },
]

export default function InvoiceForm({
  invoice,
  update,
  addItem,
  removeItem,
  updateItem,
  onExport,
  exporting,
}) {
  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>Invoice Generator</h1>
        <p className={styles.subtitle}>Fill in the details to preview your invoice</p>
      </div>

      {/* Sender */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Business</h2>
        <div className={styles.field}>
          <label>Business Logo</label>
          <LogoUpload
            logo={invoice.logo}
            onLogoChange={(val) => update('logo', val)}
          />
        </div>
        <div className={styles.field}>
          <label>Business Name</label>
          <input
            value={invoice.bizName}
            onChange={e => update('bizName', e.target.value)}
            placeholder="Acme Studio"
          />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={invoice.bizEmail}
              onChange={e => update('bizEmail', e.target.value)}
              placeholder="hello@acme.com"
            />
          </div>
          <div className={styles.field}>
            <label>Phone</label>
            <input
              value={invoice.bizPhone}
              onChange={e => update('bizPhone', e.target.value)}
              placeholder="+1 555 0100"
            />
          </div>
        </div>
        <div className={styles.field}>
          <label>Address</label>
          <textarea
            value={invoice.bizAddress}
            onChange={e => update('bizAddress', e.target.value)}
            placeholder="123 Studio Lane&#10;New York, NY 10001"
          />
        </div>
      </section>

      {/* Client */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Client</h2>
        <div className={styles.field}>
          <label>Client Name</label>
          <input
            value={invoice.clientName}
            onChange={e => update('clientName', e.target.value)}
            placeholder="Jane Doe"
          />
        </div>
        <div className={styles.field}>
          <label>Client Email</label>
          <input
            type="email"
            value={invoice.clientEmail}
            onChange={e => update('clientEmail', e.target.value)}
            placeholder="jane@company.com"
          />
        </div>
        <div className={styles.field}>
          <label>Client Address</label>
          <textarea
            value={invoice.clientAddress}
            onChange={e => update('clientAddress', e.target.value)}
            placeholder="456 Client Ave&#10;San Francisco, CA 94103"
          />
        </div>
      </section>

      {/* Invoice Details */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Invoice Details</h2>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Invoice #</label>
            <input
              value={invoice.invoiceNumber}
              onChange={e => update('invoiceNumber', e.target.value)}
              placeholder="INV-001"
            />
          </div>
          <div className={styles.field}>
            <label>Currency</label>
            <select
              value={invoice.currency}
              onChange={e => update('currency', e.target.value)}
            >
              {CURRENCIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Invoice Date</label>
            <input
              type="date"
              value={invoice.invoiceDate}
              onChange={e => update('invoiceDate', e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Due Date</label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={e => update('dueDate', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Line Items */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Line Items</h2>
        <LineItems
          items={invoice.items}
          currency={invoice.currency}
          onAdd={addItem}
          onRemove={removeItem}
          onUpdate={updateItem}
        />
      </section>

      {/* Tax & Notes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tax & Notes</h2>
        <div className={styles.field}>
          <label>Tax Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={invoice.taxRate}
            onChange={e => update('taxRate', parseFloat(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
        <div className={styles.field}>
          <label>Notes / Payment Terms</label>
          <textarea
            value={invoice.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="Payment due within 30 days. Thank you for your business!"
          />
        </div>
      </section>

      {/* Export Button */}
      <button
        className={styles.exportBtn}
        onClick={onExport}
        disabled={exporting}
      >
        {exporting ? '⏳ Generating PDF...' : '↓ Download PDF'}
      </button>
    </div>
  )
}
