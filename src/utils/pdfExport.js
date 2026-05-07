import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportToPDF(elementId, filename = 'invoice.pdf') {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth
    const imgHeight = (canvas.height / canvas.width) * imgWidth

    // If content overflows a page, scale it to fit
    if (imgHeight > pageHeight) {
      const scale = pageHeight / imgHeight
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * scale, pageHeight)
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    }

    pdf.save(filename)
    return true
  } catch (err) {
    console.error('PDF export failed:', err)
    return false
  }
}

export function formatCurrency(amount, currency = '$') {
  const formatted = Number(amount).toFixed(2)
  if (currency === 'LKR') return `LKR ${formatted}`
  return `${currency}${formatted}`
}
