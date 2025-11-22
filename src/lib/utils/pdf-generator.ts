// PDF generation utility using canvas-based PDF creation
export const downloadInvoicePDF = async (html: string, filename: string = 'invoice.pdf') => {
  let iframe: HTMLIFrameElement | null = null;
  
  try {
    // Dynamically import html2pdf to keep bundle size smaller
    const html2pdf = (await import('html2pdf.js')).default;

    // Create an isolated iframe to prevent style conflicts
    iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '-10000px';
    iframe.style.left = '-10000px';
    iframe.style.width = '210mm'; // A4 width
    iframe.style.height = '297mm'; // A4 height
    iframe.style.visibility = 'hidden';
    iframe.style.pointerEvents = 'none';
    iframe.style.zIndex = '-9999';
    iframe.style.border = 'none';
    
    // Append iframe to body
    document.body.appendChild(iframe);
    
    // Wait for iframe to be ready
    await new Promise((resolve) => {
      if (iframe) {
        iframe.onload = resolve;
        // Write the HTML into the iframe
        iframe.contentWindow?.document.open();
        iframe.contentWindow?.document.write(html);
        iframe.contentWindow?.document.close();
      }
    });
    
    // Give it a moment to render styles
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Get the entire HTML element (includes head with styles)
    const element = iframe.contentWindow?.document.documentElement;
    
    if (!element) {
      throw new Error('Failed to access iframe content');
    }

    const options = {
      margin: [10, 10, 10, 10], // 10mm margins on all sides
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        windowWidth: 794, // A4 width in pixels at 96 DPI
        windowHeight: 1123 // A4 height in pixels at 96 DPI
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', // A4 format: 210mm x 297mm
        orientation: 'portrait'
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break',
        after: '.page-break-after',
        avoid: ['.header', '.totals', '.footer', '.section']
      }
    };

    await html2pdf().set(options).from(element).save();
    
    // Clean up - remove iframe
    if (iframe && document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Clean up on error
    if (iframe && document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

// Generate PDF as base64 string for email attachment
export const generatePDFBase64 = async (html: string): Promise<string> => {
  let iframe: HTMLIFrameElement | null = null;
  
  try {
    const html2pdf = (await import('html2pdf.js')).default;

    // Create an isolated iframe to prevent style conflicts
    iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '-10000px';
    iframe.style.left = '-10000px';
    iframe.style.width = '210mm'; // A4 width
    iframe.style.height = '297mm'; // A4 height
    iframe.style.visibility = 'hidden';
    iframe.style.pointerEvents = 'none';
    iframe.style.zIndex = '-9999';
    iframe.style.border = 'none';
    
    // Append iframe to body
    document.body.appendChild(iframe);
    
    // Wait for iframe to be ready
    await new Promise((resolve) => {
      if (iframe) {
        iframe.onload = resolve;
        // Write the HTML into the iframe
        iframe.contentWindow?.document.open();
        iframe.contentWindow?.document.write(html);
        iframe.contentWindow?.document.close();
      }
    });
    
    // Give it a moment to render styles
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Get the entire HTML element (includes head with styles)
    const element = iframe.contentWindow?.document.documentElement;
    
    if (!element) {
      throw new Error('Failed to access iframe content');
    }

    const options = {
      margin: [10, 10, 10, 10],
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        windowWidth: 794, // A4 width in pixels at 96 DPI
        windowHeight: 1123 // A4 height in pixels at 96 DPI
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break',
        after: '.page-break-after',
        avoid: ['.header', '.totals', '.footer', '.section']
      }
    };

    // Generate PDF and get as data URL (base64)
    const pdf = await html2pdf().set(options).from(element).outputPdf('datauristring');
    
    // Clean up - remove iframe
    if (iframe && document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
    
    return pdf;
  } catch (error) {
    console.error('Error generating PDF base64:', error);
    // Clean up on error
    if (iframe && document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
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
