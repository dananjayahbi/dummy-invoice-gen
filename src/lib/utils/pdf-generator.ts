// PDF generation utility using jsPDF for vector-based (OCR-friendly) PDF creation
// This generates true vector PDFs with selectable, searchable text

import { InvoiceData } from '@/types/invoice';
import { downloadVectorPDF, generateVectorPDFBase64 } from './vector-pdf-generator';

// Download PDF with vector text (OCR-friendly)
export const downloadInvoicePDF = async (data: InvoiceData, filename: string = 'invoice.pdf') => {
  try {
    await downloadVectorPDF(data, filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

// Generate PDF as base64 string for email attachment (OCR-friendly vector PDF)
export const generatePDFBase64 = async (data: InvoiceData): Promise<string> => {
  try {
    const base64 = await generateVectorPDFBase64(data);
    return base64;
  } catch (error) {
    console.error('Error generating PDF base64:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

// Alternative lightweight PDF generation without external library
export const downloadInvoiceAsHTML = (html: string, filename: string = 'invoice.html') => {
  const dataStr = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', dataStr);
  downloadLink.setAttribute('download', filename);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

// Print invoice (alternative to PDF download)
export const printInvoice = (html: string) => {
  const printWindow = window.open('', '', 'height=600,width=800');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
};
