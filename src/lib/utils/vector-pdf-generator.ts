// Vector PDF Generator using jsPDF for OCR-friendly text rendering
import jsPDF from 'jspdf';
import { InvoiceData, InvoiceTemplate } from '@/types/invoice';

// Color configurations for different templates
interface TemplateColors {
  primary: string;
  secondary: string;
  headerBg: string;
  headerText: string;
  tableHeaderBg: string;
  tableHeaderText: string;
  text: string;
  lightText: string;
  border: string;
  accent: string;
}

const getTemplateColors = (template: InvoiceTemplate): TemplateColors => {
  const colorSchemes: Record<InvoiceTemplate, TemplateColors> = {
    professional: {
      primary: '#1e40af',
      secondary: '#2563eb',
      headerBg: '#ffffff',
      headerText: '#1e40af',
      tableHeaderBg: '#f3f4f6',
      tableHeaderText: '#1e40af',
      text: '#333333',
      lightText: '#666666',
      border: '#e5e7eb',
      accent: '#2563eb',
    },
    modern: {
      primary: '#667eea',
      secondary: '#764ba2',
      headerBg: '#667eea',
      headerText: '#ffffff',
      tableHeaderBg: '#667eea',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#666666',
      border: '#e5e7eb',
      accent: '#764ba2',
    },
    classic: {
      primary: '#000000',
      secondary: '#333333',
      headerBg: '#ffffff',
      headerText: '#000000',
      tableHeaderBg: '#000000',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#555555',
      border: '#000000',
      accent: '#000000',
    },
    minimal: {
      primary: '#000000',
      secondary: '#666666',
      headerBg: '#ffffff',
      headerText: '#000000',
      tableHeaderBg: '#ffffff',
      tableHeaderText: '#000000',
      text: '#333333',
      lightText: '#999999',
      border: '#eeeeee',
      accent: '#000000',
    },
    bold: {
      primary: '#000000',
      secondary: '#f0f0f0',
      headerBg: '#000000',
      headerText: '#ffffff',
      tableHeaderBg: '#000000',
      tableHeaderText: '#ffffff',
      text: '#000000',
      lightText: '#666666',
      border: '#dddddd',
      accent: '#000000',
    },
    elegant: {
      primary: '#2c3e50',
      secondary: '#d4af37',
      headerBg: '#ffffff',
      headerText: '#2c3e50',
      tableHeaderBg: '#f8f9fa',
      tableHeaderText: '#2c3e50',
      text: '#333333',
      lightText: '#6c757d',
      border: '#d4af37',
      accent: '#d4af37',
    },
    corporate: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      headerBg: '#1a1a2e',
      headerText: '#ffffff',
      tableHeaderBg: '#16213e',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#666666',
      border: '#dee2e6',
      accent: '#16213e',
    },
    creative: {
      primary: '#2d3436',
      secondary: '#ff6b6b',
      headerBg: '#ffffff',
      headerText: '#2d3436',
      tableHeaderBg: '#a29bfe',
      tableHeaderText: '#ffffff',
      text: '#2d3436',
      lightText: '#636e72',
      border: '#dfe6e9',
      accent: '#ff6b6b',
    },
    simple: {
      primary: '#000000',
      secondary: '#555555',
      headerBg: '#ffffff',
      headerText: '#000000',
      tableHeaderBg: '#ffffff',
      tableHeaderText: '#000000',
      text: '#333333',
      lightText: '#555555',
      border: '#dddddd',
      accent: '#000000',
    },
    tech: {
      primary: '#58a6ff',
      secondary: '#0d1117',
      headerBg: '#0d1117',
      headerText: '#58a6ff',
      tableHeaderBg: '#0d1117',
      tableHeaderText: '#58a6ff',
      text: '#c9d1d9',
      lightText: '#8b949e',
      border: '#30363d',
      accent: '#58a6ff',
    },
    luxury: {
      primary: '#d4af37',
      secondary: '#1a1a1a',
      headerBg: '#1a1a1a',
      headerText: '#d4af37',
      tableHeaderBg: '#1a1a1a',
      tableHeaderText: '#d4af37',
      text: '#333333',
      lightText: '#666666',
      border: '#d4af37',
      accent: '#d4af37',
    },
    startup: {
      primary: '#00c9ff',
      secondary: '#92fe9d',
      headerBg: '#00c9ff',
      headerText: '#ffffff',
      tableHeaderBg: '#00c9ff',
      tableHeaderText: '#ffffff',
      text: '#1a1a1a',
      lightText: '#6c757d',
      border: '#e9ecef',
      accent: '#92fe9d',
    },
    retro: {
      primary: '#8b4513',
      secondary: '#d2691e',
      headerBg: '#d2691e',
      headerText: '#ffffff',
      tableHeaderBg: '#d2691e',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#8b4513',
      border: '#8b4513',
      accent: '#ffd700',
    },
    neon: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      headerBg: '#000000',
      headerText: '#00ffff',
      tableHeaderBg: '#000000',
      tableHeaderText: '#ff00ff',
      text: '#ffffff',
      lightText: '#888888',
      border: '#333333',
      accent: '#00ff00',
    },
    pastel: {
      primary: '#6c5ce7',
      secondary: '#fd79a8',
      headerBg: '#ffd1dc',
      headerText: '#6c5ce7',
      tableHeaderBg: '#a29bfe',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#636e72',
      border: '#dfe6e9',
      accent: '#fd79a8',
    },
    ocean: {
      primary: '#005c97',
      secondary: '#00bcd4',
      headerBg: '#005c97',
      headerText: '#ffffff',
      tableHeaderBg: '#0097a7',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#00695c',
      border: '#b2ebf2',
      accent: '#00bcd4',
    },
    forest: {
      primary: '#2e7d32',
      secondary: '#1b5e20',
      headerBg: '#2e7d32',
      headerText: '#ffffff',
      tableHeaderBg: '#388e3c',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#2e7d32',
      border: '#c5e1a5',
      accent: '#43a047',
    },
    sunset: {
      primary: '#ff6b6b',
      secondary: '#feca57',
      headerBg: '#ff6b6b',
      headerText: '#ffffff',
      tableHeaderBg: '#ff6b6b',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#c23616',
      border: '#ffe5e5',
      accent: '#ff8e53',
    },
    midnight: {
      primary: '#5c6bc0',
      secondary: '#3949ab',
      headerBg: '#3949ab',
      headerText: '#c5cae9',
      tableHeaderBg: '#303f9f',
      tableHeaderText: '#c5cae9',
      text: '#e8eaf6',
      lightText: '#9fa8da',
      border: '#3949ab',
      accent: '#7986cb',
    },
    candy: {
      primary: '#ff006e',
      secondary: '#8338ec',
      headerBg: '#ff6ec7',
      headerText: '#ff006e',
      tableHeaderBg: '#8338ec',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#8338ec',
      border: '#ff9671',
      accent: '#f72585',
    },
    industrial: {
      primary: '#ffd54f',
      secondary: '#263238',
      headerBg: '#263238',
      headerText: '#ffd54f',
      tableHeaderBg: '#263238',
      tableHeaderText: '#ffd54f',
      text: '#333333',
      lightText: '#546e7a',
      border: '#37474f',
      accent: '#ffd54f',
    },
    vintage: {
      primary: '#8b7355',
      secondary: '#d4a574',
      headerBg: '#8b7355',
      headerText: '#fffef9',
      tableHeaderBg: '#8b7355',
      tableHeaderText: '#fffef9',
      text: '#5d4e37',
      lightText: '#8b7355',
      border: '#d4a574',
      accent: '#8b7355',
    },
    futuristic: {
      primary: '#00d4ff',
      secondary: '#004d7a',
      headerBg: '#004d7a',
      headerText: '#00d4ff',
      tableHeaderBg: '#004d7a',
      tableHeaderText: '#00d4ff',
      text: '#66d9ef',
      lightText: '#66d9ef',
      border: '#00d4ff',
      accent: '#00d4ff',
    },
    'minimalist-pro': {
      primary: '#000000',
      secondary: '#555555',
      headerBg: '#ffffff',
      headerText: '#000000',
      tableHeaderBg: '#ffffff',
      tableHeaderText: '#000000',
      text: '#333333',
      lightText: '#999999',
      border: '#e0e0e0',
      accent: '#e31e24',
    },
    colorful: {
      primary: '#f093fb',
      secondary: '#667eea',
      headerBg: '#f093fb',
      headerText: '#ffffff',
      tableHeaderBg: '#4facfe',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#666666',
      border: '#e0e0e0',
      accent: '#f5576c',
    },
    monochrome: {
      primary: '#000000',
      secondary: '#e0e0e0',
      headerBg: '#000000',
      headerText: '#ffffff',
      tableHeaderBg: '#000000',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#666666',
      border: '#cccccc',
      accent: '#000000',
    },
    gradient: {
      primary: '#667eea',
      secondary: '#f093fb',
      headerBg: '#667eea',
      headerText: '#ffffff',
      tableHeaderBg: '#8e2de2',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#666666',
      border: '#e0e0e0',
      accent: '#764ba2',
    },
    geometric: {
      primary: '#2c3e50',
      secondary: '#e74c3c',
      headerBg: '#2c3e50',
      headerText: '#ecf0f1',
      tableHeaderBg: '#3498db',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#7f8c8d',
      border: '#bdc3c7',
      accent: '#e74c3c',
    },
    organic: {
      primary: '#3d7068',
      secondary: '#6a9c89',
      headerBg: '#6a9c89',
      headerText: '#f5f5dc',
      tableHeaderBg: '#87a78f',
      tableHeaderText: '#ffffff',
      text: '#333333',
      lightText: '#6a9c89',
      border: '#c8dcc8',
      accent: '#6a9c89',
    },
    swiss: {
      primary: '#e31e24',
      secondary: '#000000',
      headerBg: '#ffffff',
      headerText: '#000000',
      tableHeaderBg: '#ffffff',
      tableHeaderText: '#000000',
      text: '#333333',
      lightText: '#666666',
      border: '#cccccc',
      accent: '#e31e24',
    },
  };

  return colorSchemes[template] || colorSchemes.professional;
};

// Helper to convert hex color to RGB for jsPDF
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ];
  }
  return [0, 0, 0];
};

// Format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Generate PDF with vector text (OCR-friendly)
export const generateVectorPDF = (data: InvoiceData): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const colors = getTemplateColors(data.template);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let yPosition = margin;

  // Helper function to set text color
  const setTextColor = (color: string) => {
    const rgb = hexToRgb(color);
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  };

  // Helper function to set draw color
  const setDrawColor = (color: string) => {
    const rgb = hexToRgb(color);
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  };

  // Helper function to set fill color
  const setFillColor = (color: string) => {
    const rgb = hexToRgb(color);
    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  };

  // Helper function to check page break
  const checkPageBreak = (height: number): boolean => {
    if (yPosition + height > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Draw header background for templates with colored headers
  const darkBgTemplates = ['modern', 'bold', 'corporate', 'tech', 'luxury', 'neon', 'midnight', 'industrial', 'futuristic', 'startup', 'retro', 'sunset', 'ocean', 'forest', 'colorful', 'gradient', 'geometric', 'monochrome', 'candy', 'vintage', 'pastel', 'organic'];
  
  if (darkBgTemplates.includes(data.template)) {
    setFillColor(colors.headerBg);
    doc.rect(0, 0, pageWidth, 45, 'F');
  }

  // Company Name
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  setTextColor(darkBgTemplates.includes(data.template) ? colors.headerText : colors.primary);
  doc.text(data.company.name, margin, yPosition + 8);

  // Company details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setTextColor(darkBgTemplates.includes(data.template) ? colors.headerText : colors.lightText);
  
  let companyY = yPosition + 14;
  if (data.fieldVisibility.companyEmail && data.company.email) {
    doc.text(`Email: ${data.company.email}`, margin, companyY);
    companyY += 4;
  }
  if (data.fieldVisibility.companyPhone && data.company.phone) {
    doc.text(`Phone: ${data.company.phone}`, margin, companyY);
    companyY += 4;
  }
  if (data.fieldVisibility.companyAddress && data.company.address) {
    doc.text(`Address: ${data.company.address}`, margin, companyY);
    companyY += 4;
  }
  if (data.fieldVisibility.companyWebsite && data.company.website) {
    doc.text(`Website: ${data.company.website}`, margin, companyY);
  }

  // Invoice title (right side)
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  setTextColor(darkBgTemplates.includes(data.template) ? colors.headerText : colors.primary);
  doc.text('INVOICE', pageWidth - margin, yPosition + 8, { align: 'right' });

  // Invoice meta (right side)
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setTextColor(darkBgTemplates.includes(data.template) ? colors.headerText : colors.lightText);
  
  let metaY = yPosition + 16;
  if (data.includeInvoiceNumber && data.invoiceNumber) {
    doc.text(`Invoice #: ${data.invoiceNumber}`, pageWidth - margin, metaY, { align: 'right' });
    metaY += 4;
  }
  doc.text(`Date: ${new Date(data.invoiceDate).toLocaleDateString()}`, pageWidth - margin, metaY, { align: 'right' });
  metaY += 4;
  if (data.fieldVisibility.dueDate && data.dueDate) {
    doc.text(`Due Date: ${new Date(data.dueDate).toLocaleDateString()}`, pageWidth - margin, metaY, { align: 'right' });
  }

  yPosition = darkBgTemplates.includes(data.template) ? 55 : 50;

  // Separator line
  setDrawColor(colors.border);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Bill To section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  setTextColor(colors.primary);
  doc.text('BILL TO', margin, yPosition);
  yPosition += 6;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  setTextColor(colors.text);
  doc.text(data.client.name, margin, yPosition);
  yPosition += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setTextColor(colors.lightText);
  
  if (data.fieldVisibility.clientEmail && data.client.email) {
    doc.text(data.client.email, margin, yPosition);
    yPosition += 4;
  }
  if (data.fieldVisibility.clientPhone && data.client.phone) {
    doc.text(data.client.phone, margin, yPosition);
    yPosition += 4;
  }
  if (data.fieldVisibility.clientAddress && data.client.address) {
    doc.text(data.client.address, margin, yPosition);
    yPosition += 4;
  }

  yPosition += 10;

  // Line Items Table
  const tableStartY = yPosition;
  const colWidths = {
    description: contentWidth * 0.5,
    quantity: contentWidth * 0.15,
    unitPrice: contentWidth * 0.15,
    total: contentWidth * 0.2,
  };

  // Table Header
  checkPageBreak(10);
  setFillColor(colors.tableHeaderBg);
  doc.rect(margin, yPosition, contentWidth, 8, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  setTextColor(colors.tableHeaderText);

  let xPos = margin + 2;
  doc.text('Description', xPos, yPosition + 5.5);
  xPos += colWidths.description;
  doc.text('Qty', xPos, yPosition + 5.5);
  xPos += colWidths.quantity;
  doc.text('Unit Price', xPos, yPosition + 5.5);
  xPos += colWidths.unitPrice;
  doc.text('Total', xPos, yPosition + 5.5);

  yPosition += 8;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  setTextColor(colors.text);
  
  let subtotal = 0;
  data.lineItems.forEach((item, index) => {
    checkPageBreak(8);
    
    const lineTotal = item.quantity * item.unitPrice;
    subtotal += lineTotal;

    // Alternate row background
    if (index % 2 === 0) {
      setFillColor('#f9fafb');
      doc.rect(margin, yPosition, contentWidth, 7, 'F');
    }

    xPos = margin + 2;
    doc.setFontSize(9);
    setTextColor(colors.text);
    
    // Truncate description if too long
    const maxDescLength = 50;
    const description = item.description.length > maxDescLength 
      ? item.description.substring(0, maxDescLength) + '...' 
      : item.description;
    
    doc.text(description, xPos, yPosition + 5);
    xPos += colWidths.description;
    doc.text(item.quantity.toString(), xPos, yPosition + 5);
    xPos += colWidths.quantity;
    doc.text(formatCurrency(item.unitPrice), xPos, yPosition + 5);
    xPos += colWidths.unitPrice;
    doc.text(formatCurrency(lineTotal), xPos, yPosition + 5);

    yPosition += 7;
  });

  // Table bottom line
  setDrawColor(colors.border);
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Totals section
  checkPageBreak(30);
  
  const totalsX = pageWidth - margin - 60;
  const valuesX = pageWidth - margin;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setTextColor(colors.text);

  // Subtotal
  doc.text('Subtotal:', totalsX, yPosition);
  doc.text(formatCurrency(subtotal), valuesX, yPosition, { align: 'right' });
  yPosition += 6;

  // Tax
  let taxAmount = 0;
  if (data.includeTaxDetails && data.taxDetails) {
    taxAmount = (subtotal * data.taxDetails.rate) / 100;
    doc.text(`${data.taxDetails.taxName} (${data.taxDetails.rate}%):`, totalsX, yPosition);
    doc.text(formatCurrency(taxAmount), valuesX, yPosition, { align: 'right' });
    yPosition += 6;
  }

  // Total
  const total = subtotal + taxAmount;
  
  setDrawColor(colors.primary);
  doc.setLineWidth(0.5);
  doc.line(totalsX - 5, yPosition, pageWidth - margin, yPosition);
  yPosition += 4;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setTextColor(colors.primary);
  doc.text('Total:', totalsX, yPosition);
  doc.text(formatCurrency(total), valuesX, yPosition, { align: 'right' });
  yPosition += 2;

  doc.line(totalsX - 5, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;

  // Payment Details
  if (data.includeBankDetails && data.bankDetails) {
    checkPageBreak(40);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    setTextColor(colors.primary);
    doc.text('PAYMENT DETAILS', margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    setTextColor(colors.text);

    if (data.fieldVisibility.bankAccountName && data.bankDetails.accountName) {
      doc.text(`Account Name: ${data.bankDetails.accountName}`, margin, yPosition);
      yPosition += 4;
    }
    if (data.fieldVisibility.bankAccountNumber && data.bankDetails.accountNumber) {
      doc.text(`Account Number: ${data.bankDetails.accountNumber}`, margin, yPosition);
      yPosition += 4;
    }
    if (data.fieldVisibility.bankName && data.bankDetails.bankName) {
      doc.text(`Bank Name: ${data.bankDetails.bankName}`, margin, yPosition);
      yPosition += 4;
    }
    if (data.fieldVisibility.bankBSB && data.bankDetails.bsb) {
      doc.text(`BSB: ${data.bankDetails.bsb}`, margin, yPosition);
      yPosition += 4;
    }
    if (data.fieldVisibility.bankSwiftCode && data.bankDetails.swiftCode) {
      doc.text(`SWIFT Code: ${data.bankDetails.swiftCode}`, margin, yPosition);
      yPosition += 4;
    }
    if (data.fieldVisibility.bankIBAN && data.bankDetails.iban) {
      doc.text(`IBAN: ${data.bankDetails.iban}`, margin, yPosition);
      yPosition += 4;
    }

    yPosition += 6;
  }

  // Payment Terms
  if (data.includePaymentTerms && data.paymentTerms) {
    checkPageBreak(15);
    
    setFillColor('#f9fafb');
    doc.rect(margin, yPosition, contentWidth, 12, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    setTextColor(colors.text);
    doc.text('Payment Terms:', margin + 3, yPosition + 5);
    
    doc.setFont('helvetica', 'normal');
    setTextColor(colors.lightText);
    doc.text(data.paymentTerms, margin + 35, yPosition + 5);
    
    yPosition += 16;
  }

  // Notes
  if (data.notes) {
    checkPageBreak(15);
    
    setFillColor('#f9fafb');
    doc.rect(margin, yPosition, contentWidth, 12, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    setTextColor(colors.text);
    doc.text('Notes:', margin + 3, yPosition + 5);
    
    doc.setFont('helvetica', 'normal');
    setTextColor(colors.lightText);
    doc.text(data.notes, margin + 18, yPosition + 5);
    
    yPosition += 16;
  }

  // Footer
  yPosition = pageHeight - 15;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  setTextColor(colors.lightText);
  doc.text('Thank you for your business!', pageWidth / 2, yPosition, { align: 'center' });

  return doc;
};

// Download PDF with vector text
export const downloadVectorPDF = async (data: InvoiceData, filename: string = 'invoice.pdf'): Promise<void> => {
  const doc = generateVectorPDF(data);
  doc.save(filename);
};

// Generate PDF as base64 string for email attachment
export const generateVectorPDFBase64 = async (data: InvoiceData): Promise<string> => {
  const doc = generateVectorPDF(data);
  const pdfOutput = doc.output('datauristring');
  return pdfOutput;
};

// Export jsPDF instance for advanced usage
export { jsPDF };
