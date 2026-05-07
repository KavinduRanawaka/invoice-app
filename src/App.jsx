import React, { useState } from 'react'
import { useInvoice } from './hooks/useInvoice'
import { exportToPDF } from './utils/pdfExport'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'
import styles from './App.module.css'

export default function App() {
  const { invoice, update, addItem, removeItem, updateItem, subtotal, taxAmount, total } = useInvoice()
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    const filename = `${invoice.invoiceNumber || 'invoice'}.pdf`
    await exportToPDF('invoice-preview', filename)
    setExporting(false)
  }

  return (
    <div className={styles.app}>
      {/* Left: Form */}
      <aside className={styles.left}>
        <InvoiceForm
          invoice={invoice}
          update={update}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
          onExport={handleExport}
          exporting={exporting}
        />
      </aside>

      {/* Right: Preview */}
      <main className={styles.right}>
        <InvoicePreview
          invoice={invoice}
          subtotal={subtotal}
          taxAmount={taxAmount}
          total={total}
        />
      </main>
    </div>
  )
}
