import { InvoiceTemplate } from '@/types/invoice';

export const getTemplateStyles = (template: InvoiceTemplate): string => {
  const baseStyles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; color: #333; background: white; }
    .container { max-width: 210mm; margin: 0 auto; padding: 20mm; background: white; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    table td { font-size: 12px; padding: 12px; }
    .text-right { text-align: right; }
    
    /* Page break rules for multi-page invoices */
    .header { page-break-inside: avoid; page-break-after: avoid; }
    .section { page-break-inside: avoid; }
    .totals { page-break-inside: avoid; page-break-before: avoid; }
    .footer { page-break-inside: avoid; }
    table { page-break-inside: auto; }
    table tr { page-break-inside: avoid; page-break-after: auto; }
    table thead { display: table-header-group; }
    table tfoot { display: table-footer-group; }
    
    @page { size: A4; margin: 10mm; }
    @media print { 
      body { margin: 0; padding: 0; } 
      .container { max-width: 100%; margin: 0; padding: 15mm; page-break-after: auto; }
      .page-break { page-break-before: always; }
    }
  `;

  const templateStyles: Record<InvoiceTemplate, string> = {
    professional: `
      ${baseStyles}
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
      .company-info h1 { font-size: 26px; margin-bottom: 12px; color: #1e40af; font-weight: 700; }
      .company-info p { font-size: 13px; color: #666; margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #1e40af; margin-bottom: 12px; font-weight: 700; }
      .invoice-meta { font-size: 13px; color: #666; }
      .invoice-meta p { margin: 5px 0; }
      .section { margin: 30px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #1e40af; margin-bottom: 12px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 30px; }
      .billing-column { flex: 1; }
      .billing-column p { font-size: 13px; margin: 5px 0; }
      .billing-column strong { color: #1e40af; font-size: 14px; }
      table thead { background: #f3f4f6; }
      table th { font-size: 13px; font-weight: 700; text-align: left; padding: 14px; color: #1e40af; border-bottom: 2px solid #2563eb; }
      table tr:hover { background: #f9fafb; }
      table td { border-bottom: 1px solid #e5e7eb; }
      .totals { margin: 30px 0; }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 10px 0; }
      .total-row .label { width: 180px; font-weight: 600; }
      .total-row .value { width: 120px; text-align: right; }
      .total-row.grand-total { font-size: 20px; font-weight: 700; color: #1e40af; border-top: 3px solid #2563eb; border-bottom: 3px solid #2563eb; padding: 12px 0; margin-top: 18px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #666; text-align: center; }
      .notes { background: #f9fafb; padding: 16px; border-left: 4px solid #2563eb; margin: 20px 0; font-size: 13px; }
    `,
    
    modern: `
      ${baseStyles}
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; }
      .company-info h1 { font-size: 28px; margin-bottom: 10px; color: white; font-weight: 600; }
      .company-info p { font-size: 12px; color: rgba(255,255,255,0.9); margin: 4px 0; }
      .invoice-title h2 { font-size: 32px; color: white; margin-bottom: 10px; font-weight: 300; letter-spacing: 2px; }
      .invoice-meta { font-size: 12px; color: rgba(255,255,255,0.9); }
      .invoice-meta p { margin: 4px 0; }
      .section { margin: 30px 0; }
      .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #667eea; margin-bottom: 15px; letter-spacing: 1px; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 30px; }
      .billing-column { flex: 1; background: #f8f9fa; padding: 20px; border-radius: 8px; }
      .billing-column p { font-size: 13px; margin: 4px 0; }
      .billing-column strong { color: #667eea; font-size: 15px; }
      table thead { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      table th { font-size: 12px; font-weight: 600; text-align: left; padding: 15px; color: white; }
      table tr:nth-child(even) { background: #f8f9fa; }
      table td { border-bottom: 1px solid #e5e7eb; }
      .totals { margin: 30px 0; background: #f8f9fa; padding: 20px; border-radius: 8px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 8px 0; }
      .total-row .label { width: 170px; font-weight: 500; }
      .total-row .value { width: 120px; text-align: right; }
      .total-row.grand-total { font-size: 22px; font-weight: 700; color: #667eea; border-top: 2px solid #667eea; padding-top: 12px; margin-top: 12px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #666; text-align: center; }
      .notes { background: #fff8dc; padding: 16px; border-left: 4px solid #f59e0b; margin: 20px 0; font-size: 13px; border-radius: 4px; }
    `,

    classic: `
      ${baseStyles}
      body { font-family: Georgia, 'Times New Roman', serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 4px double #000; padding-bottom: 20px; }
      .company-info h1 { font-size: 24px; margin-bottom: 10px; color: #000; font-weight: 700; font-family: Georgia, serif; }
      .company-info p { font-size: 12px; color: #333; margin: 4px 0; font-style: italic; }
      .invoice-title h2 { font-size: 36px; color: #000; margin-bottom: 10px; font-weight: 400; font-family: Georgia, serif; }
      .invoice-meta { font-size: 12px; color: #333; }
      .invoice-meta p { margin: 4px 0; }
      .section { margin: 30px 0; }
      .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #000; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 5px; letter-spacing: 2px; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 30px; }
      .billing-column { flex: 1; border: 1px solid #000; padding: 15px; }
      .billing-column p { font-size: 13px; margin: 4px 0; }
      .billing-column strong { color: #000; font-size: 14px; }
      table thead { background: #000; color: white; }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 12px; color: white; }
      table tr { border-bottom: 1px solid #000; }
      table td { border-bottom: 1px solid #ccc; }
      .totals { margin: 30px 0; }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 8px 0; }
      .total-row .label { width: 170px; font-weight: 600; }
      .total-row .value { width: 120px; text-align: right; }
      .total-row.grand-total { font-size: 18px; font-weight: 700; color: #000; border-top: 4px double #000; border-bottom: 4px double #000; padding: 10px 0; margin-top: 15px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #000; font-size: 11px; color: #333; text-align: center; font-style: italic; }
      .notes { background: #f5f5f5; padding: 15px; border: 1px solid #000; margin: 20px 0; font-size: 12px; }
    `,

    minimal: `
      ${baseStyles}
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 60px; }
      .company-info h1 { font-size: 22px; margin-bottom: 15px; color: #000; font-weight: 300; letter-spacing: 3px; }
      .company-info p { font-size: 11px; color: #666; margin: 3px 0; }
      .invoice-title h2 { font-size: 28px; color: #000; margin-bottom: 15px; font-weight: 200; letter-spacing: 5px; }
      .invoice-meta { font-size: 11px; color: #666; }
      .invoice-meta p { margin: 3px 0; }
      .section { margin: 40px 0; }
      .section-title { font-size: 10px; font-weight: 600; text-transform: uppercase; color: #000; margin-bottom: 15px; letter-spacing: 2px; }
      .billing-section { display: flex; gap: 60px; margin-bottom: 40px; }
      .billing-column { flex: 1; }
      .billing-column p { font-size: 12px; margin: 4px 0; }
      .billing-column strong { color: #000; font-size: 13px; font-weight: 500; }
      table thead { background: transparent; border-bottom: 1px solid #000; }
      table th { font-size: 10px; font-weight: 600; text-align: left; padding: 12px; color: #000; text-transform: uppercase; letter-spacing: 1px; }
      table tr:hover { background: transparent; }
      table td { border-bottom: 1px solid #eee; }
      .totals { margin: 40px 0; }
      .total-row { display: flex; justify-content: flex-end; font-size: 13px; margin: 8px 0; }
      .total-row .label { width: 150px; font-weight: 400; }
      .total-row .value { width: 100px; text-align: right; }
      .total-row.grand-total { font-size: 18px; font-weight: 500; color: #000; border-top: 1px solid #000; padding-top: 12px; margin-top: 12px; }
      .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; font-size: 10px; color: #999; text-align: center; }
      .notes { background: transparent; padding: 15px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; margin: 20px 0; font-size: 12px; color: #666; }
    `,

    bold: `
      ${baseStyles}
      body { font-family: 'Arial Black', Arial, sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; background: #000; color: white; padding: 30px; }
      .company-info h1 { font-size: 30px; margin-bottom: 10px; color: #fff; font-weight: 900; }
      .company-info p { font-size: 13px; color: #ddd; margin: 5px 0; }
      .invoice-title h2 { font-size: 42px; color: #fff; margin-bottom: 10px; font-weight: 900; }
      .invoice-meta { font-size: 13px; color: #ddd; }
      .invoice-meta p { margin: 5px 0; }
      .section { margin: 30px 0; }
      .section-title { font-size: 14px; font-weight: 900; text-transform: uppercase; color: #000; margin-bottom: 12px; background: #f0f0f0; padding: 8px 12px; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 30px; }
      .billing-column { flex: 1; background: #f0f0f0; padding: 20px; }
      .billing-column p { font-size: 13px; margin: 4px 0; }
      .billing-column strong { color: #000; font-size: 16px; font-weight: 900; }
      table thead { background: #000; color: white; }
      table th { font-size: 13px; font-weight: 900; text-align: left; padding: 15px; color: white; text-transform: uppercase; }
      table tr:nth-child(even) { background: #f0f0f0; }
      table td { border-bottom: 2px solid #ddd; font-weight: 600; }
      .totals { margin: 30px 0; background: #000; color: white; padding: 20px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 16px; margin: 10px 0; color: white; }
      .total-row .label { width: 180px; font-weight: 700; }
      .total-row .value { width: 130px; text-align: right; }
      .total-row.grand-total { font-size: 28px; font-weight: 900; color: #fff; border-top: 3px solid #fff; padding-top: 15px; margin-top: 15px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 3px solid #000; font-size: 12px; color: #000; text-align: center; font-weight: 700; }
      .notes { background: #000; color: white; padding: 18px; margin: 20px 0; font-size: 13px; font-weight: 600; }
    `,

    elegant: `
      ${baseStyles}
      body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; border-bottom: 1px solid #d4af37; padding-bottom: 25px; }
      .company-info h1 { font-size: 26px; margin-bottom: 12px; color: #2c3e50; font-weight: 400; font-style: italic; }
      .company-info p { font-size: 12px; color: #6c757d; margin: 5px 0; }
      .invoice-title h2 { font-size: 34px; color: #d4af37; margin-bottom: 12px; font-weight: 400; font-style: italic; }
      .invoice-meta { font-size: 12px; color: #6c757d; }
      .invoice-meta p { margin: 5px 0; }
      .section { margin: 35px 0; }
      .section-title { font-size: 12px; font-weight: 600; color: #d4af37; margin-bottom: 12px; border-bottom: 1px solid #d4af37; padding-bottom: 6px; font-style: italic; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 35px; }
      .billing-column { flex: 1; border: 1px solid #e5e5e5; padding: 18px; background: #fafaf9; }
      .billing-column p { font-size: 13px; margin: 5px 0; }
      .billing-column strong { color: #2c3e50; font-size: 15px; }
      table thead { background: linear-gradient(to right, #f8f9fa, #e9ecef); }
      table th { font-size: 12px; font-weight: 600; text-align: left; padding: 14px; color: #2c3e50; font-style: italic; }
      table tr:hover { background: #fafaf9; }
      table td { border-bottom: 1px solid #e5e5e5; }
      .totals { margin: 35px 0; border: 1px solid #d4af37; padding: 20px; background: #fafaf9; }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 9px 0; }
      .total-row .label { width: 170px; font-weight: 500; font-style: italic; }
      .total-row .value { width: 120px; text-align: right; }
      .total-row.grand-total { font-size: 20px; font-weight: 600; color: #d4af37; border-top: 2px solid #d4af37; padding-top: 12px; margin-top: 12px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 1px solid #d4af37; font-size: 11px; color: #6c757d; text-align: center; font-style: italic; }
      .notes { background: #fafaf9; padding: 16px; border-left: 3px solid #d4af37; margin: 20px 0; font-size: 13px; font-style: italic; }
    `,

    corporate: `
      ${baseStyles}
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; background: #1a1a2e; color: white; padding: 25px 30px; }
      .company-info h1 { font-size: 26px; margin-bottom: 10px; color: #fff; font-weight: 700; }
      .company-info p { font-size: 12px; color: #ccc; margin: 4px 0; }
      .invoice-title h2 { font-size: 34px; color: #16213e; margin-bottom: 10px; font-weight: 700; }
      .invoice-title h2 { font-size: 34px; color: #fff; margin-bottom: 10px; font-weight: 700; }
      .invoice-meta { font-size: 12px; color: #ccc; }
      .invoice-meta p { margin: 4px 0; }
      .section { margin: 30px 0; }
      .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #1a1a2e; margin-bottom: 12px; background: #e8f4f8; padding: 8px 12px; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 30px; }
      .billing-column { flex: 1; border-left: 4px solid #16213e; padding-left: 15px; }
      .billing-column p { font-size: 13px; margin: 4px 0; }
      .billing-column strong { color: #1a1a2e; font-size: 15px; }
      table thead { background: #16213e; color: white; }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 14px; color: white; }
      table tr:nth-child(even) { background: #f8f9fa; }
      table td { border-bottom: 1px solid #dee2e6; }
      .totals { margin: 30px 0; }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 9px 0; }
      .total-row .label { width: 170px; font-weight: 600; }
      .total-row .value { width: 120px; text-align: right; }
      .total-row.grand-total { font-size: 20px; font-weight: 700; color: #1a1a2e; background: #e8f4f8; padding: 12px; margin-top: 15px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #1a1a2e; font-size: 11px; color: #666; text-align: center; }
      .notes { background: #e8f4f8; padding: 16px; border-left: 4px solid #16213e; margin: 20px 0; font-size: 13px; }
    `,

    creative: `
      ${baseStyles}
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; position: relative; }
      .header::after { content: ''; position: absolute; bottom: -15px; left: 0; width: 100%; height: 8px; background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731); }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #2d3436; font-weight: 800; }
      .company-info p { font-size: 12px; color: #636e72; margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #ff6b6b; margin-bottom: 12px; font-weight: 800; transform: skew(-5deg); }
      .invoice-meta { font-size: 12px; color: #636e72; }
      .invoice-meta p { margin: 5px 0; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #fff; background: linear-gradient(135deg, #4ecdc4, #45b7d1); margin-bottom: 14px; padding: 10px 15px; border-radius: 25px; display: inline-block; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: linear-gradient(135deg, #ffeaa7, #fdcb6e); padding: 20px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      .billing-column p { font-size: 13px; margin: 5px 0; }
      .billing-column strong { color: #2d3436; font-size: 16px; }
      table thead { background: linear-gradient(135deg, #a29bfe, #6c5ce7); color: white; }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: white; }
      table tr:hover { background: #dfe6e9; }
      table td { border-bottom: 2px solid #b2bec3; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #74b9ff, #0984e3); color: white; padding: 25px; border-radius: 15px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; color: white; }
      .total-row .label { width: 180px; font-weight: 600; }
      .total-row .value { width: 130px; text-align: right; }
      .total-row.grand-total { font-size: 24px; font-weight: 800; border-top: 2px solid white; padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 4px solid #dfe6e9; font-size: 11px; color: #636e72; text-align: center; }
      .notes { background: linear-gradient(135deg, #ffeaa7, #fdcb6e); padding: 18px; border-radius: 10px; margin: 20px 0; font-size: 13px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    `,

    simple: `
      ${baseStyles}
      .header { margin-bottom: 50px; }
      .company-info h1 { font-size: 24px; margin-bottom: 20px; color: #000; font-weight: 600; }
      .company-info p { font-size: 12px; color: #555; margin: 3px 0; }
      .invoice-title h2 { font-size: 28px; color: #000; margin: 20px 0; font-weight: 600; }
      .invoice-meta { font-size: 12px; color: #555; }
      .invoice-meta p { margin: 3px 0; }
      .section { margin: 35px 0; }
      .section-title { font-size: 12px; font-weight: 600; color: #000; margin-bottom: 12px; }
      .billing-section { margin-bottom: 35px; }
      .billing-column p { font-size: 12px; margin: 3px 0; }
      .billing-column strong { color: #000; font-size: 13px; }
      table thead { background: #fff; border-bottom: 2px solid #000; }
      table th { font-size: 12px; font-weight: 600; text-align: left; padding: 12px; color: #000; }
      table td { border-bottom: 1px solid #ddd; }
      .totals { margin: 35px 0; }
      .total-row { display: flex; justify-content: flex-end; font-size: 13px; margin: 8px 0; }
      .total-row .label { width: 150px; }
      .total-row .value { width: 100px; text-align: right; }
      .total-row.grand-total { font-size: 18px; font-weight: 600; border-top: 2px solid #000; padding-top: 12px; margin-top: 12px; }
      .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #555; }
      .notes { padding: 15px 0; margin: 20px 0; font-size: 12px; }
    `,

    tech: `
      ${baseStyles}
      body { font-family: 'Courier New', Courier, monospace; background: #0d1117; color: #c9d1d9; }
      .container { background: #161b22; border: 1px solid #30363d; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; background: #0d1117; border: 1px solid #30363d; padding: 25px; }
      .company-info h1 { font-size: 24px; margin-bottom: 10px; color: #58a6ff; font-weight: 700; font-family: 'Courier New', monospace; }
      .company-info p { font-size: 11px; color: #8b949e; margin: 4px 0; }
      .invoice-title h2 { font-size: 32px; color: #58a6ff; margin-bottom: 10px; font-weight: 700; }
      .invoice-meta { font-size: 11px; color: #8b949e; }
      .invoice-meta p { margin: 4px 0; }
      .section { margin: 30px 0; }
      .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #58a6ff; margin-bottom: 12px; border-bottom: 1px solid #30363d; padding-bottom: 6px; font-family: monospace; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 30px; }
      .billing-column { flex: 1; background: #0d1117; border: 1px solid #30363d; padding: 15px; }
      .billing-column p { font-size: 12px; margin: 4px 0; color: #c9d1d9; }
      .billing-column strong { color: #58a6ff; font-size: 13px; }
      table thead { background: #0d1117; border-bottom: 2px solid #58a6ff; }
      table th { font-size: 11px; font-weight: 700; text-align: left; padding: 12px; color: #58a6ff; text-transform: uppercase; }
      table tr:nth-child(even) { background: #0d1117; }
      table td { border-bottom: 1px solid #30363d; color: #c9d1d9; }
      .totals { margin: 30px 0; background: #0d1117; border: 1px solid #30363d; padding: 20px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 13px; margin: 8px 0; color: #c9d1d9; }
      .total-row .label { width: 160px; font-weight: 600; }
      .total-row .value { width: 110px; text-align: right; }
      .total-row.grand-total { font-size: 18px; font-weight: 700; color: #58a6ff; border-top: 2px solid #58a6ff; padding-top: 12px; margin-top: 12px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #30363d; font-size: 10px; color: #8b949e; text-align: center; }
      .notes { background: #0d1117; border: 1px solid #30363d; padding: 15px; margin: 20px 0; font-size: 12px; color: #c9d1d9; }
    `,

    luxury: `
      ${baseStyles}
      body { font-family: 'Didot', 'Bodoni MT', 'Times New Roman', serif; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); }
      .container { background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%); border: 3px solid #d4af37; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.3); }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #d4af37; padding: 35px; position: relative; }
      .header::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 100%; height: 5px; background: linear-gradient(90deg, #d4af37, #f4e5a1, #d4af37); }
      .company-info h1 { font-size: 32px; margin-bottom: 12px; color: #d4af37; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; }
      .company-info p { font-size: 12px; color: #c0c0c0; margin: 5px 0; letter-spacing: 1px; }
      .invoice-title h2 { font-size: 40px; color: #d4af37; margin-bottom: 12px; font-weight: 300; letter-spacing: 5px; }
      .invoice-meta { font-size: 12px; color: #c0c0c0; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 600; color: #d4af37; margin-bottom: 15px; border-bottom: 2px solid #d4af37; padding-bottom: 8px; letter-spacing: 2px; text-transform: uppercase; }
      .billing-section { display: flex; gap: 40px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); border: 2px solid #d4af37; padding: 22px; }
      .billing-column strong { color: #1a1a1a; font-size: 16px; letter-spacing: 1px; }
      table thead { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); }
      table th { font-size: 12px; font-weight: 600; text-align: left; padding: 16px; color: #d4af37; letter-spacing: 1px; text-transform: uppercase; }
      table tr:nth-child(even) { background: #fafafa; }
      table td { border-bottom: 1px solid #e8e8e8; padding: 14px; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #d4af37; padding: 25px; border: 2px solid #d4af37; }
      .total-row { display: flex; justify-content: flex-end; font-size: 16px; margin: 10px 0; }
      .total-row.grand-total { font-size: 26px; font-weight: 600; border-top: 2px solid #d4af37; padding-top: 15px; margin-top: 15px; letter-spacing: 2px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #d4af37; font-size: 11px; color: #666; text-align: center; letter-spacing: 1px; }
      .notes { background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); border-left: 4px solid #d4af37; padding: 20px; margin: 20px 0; font-size: 13px; }
    `,

    startup: `
      ${baseStyles}
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%); padding: 30px; border-radius: 20px 20px 0 0; }
      .company-info h1 { font-size: 28px; margin-bottom: 10px; color: #fff; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .company-info p { font-size: 12px; color: rgba(255,255,255,0.95); margin: 4px 0; }
      .invoice-title h2 { font-size: 36px; color: #fff; margin-bottom: 10px; font-weight: 800; }
      .section { margin: 30px 0; }
      .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #00c9ff; margin-bottom: 12px; padding: 8px 16px; background: rgba(0, 201, 255, 0.1); border-radius: 20px; display: inline-block; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 30px; }
      .billing-column { flex: 1; background: #f8f9fa; padding: 20px; border-radius: 12px; border-left: 4px solid #00c9ff; }
      .billing-column strong { color: #1a1a1a; font-size: 15px; font-weight: 700; }
      table thead { background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 14px; color: #fff; }
      table tr:hover { background: rgba(0, 201, 255, 0.05); }
      table td { border-bottom: 1px solid #e9ecef; }
      .totals { margin: 30px 0; background: linear-gradient(135deg, rgba(0, 201, 255, 0.1) 0%, rgba(146, 254, 157, 0.1) 100%); padding: 20px; border-radius: 12px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 9px 0; }
      .total-row.grand-total { font-size: 22px; font-weight: 800; color: #00c9ff; border-top: 3px solid #00c9ff; padding-top: 12px; margin-top: 12px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e9ecef; font-size: 11px; color: #6c757d; text-align: center; }
      .notes { background: rgba(146, 254, 157, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #92fe9d; margin: 20px 0; font-size: 13px; }
    `,

    retro: `
      ${baseStyles}
      body { font-family: 'Courier New', Courier, monospace; background: #f5e6d3; }
      .container { background: #fff8e7; border: 4px solid #8b4513; box-shadow: 8px 8px 0 rgba(139, 69, 19, 0.3); }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; background: #d2691e; padding: 25px; border: 3px dashed #8b4513; }
      .company-info h1 { font-size: 26px; margin-bottom: 10px; color: #fff; font-weight: 700; text-shadow: 3px 3px 0 rgba(0,0,0,0.3); }
      .company-info p { font-size: 12px; color: #ffe4b5; margin: 4px 0; }
      .invoice-title h2 { font-size: 34px; color: #fff; margin-bottom: 10px; font-weight: 700; text-shadow: 3px 3px 0 rgba(0,0,0,0.3); }
      .section { margin: 30px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #8b4513; margin-bottom: 12px; background: #ffd700; padding: 8px 12px; border: 2px solid #8b4513; box-shadow: 4px 4px 0 rgba(139, 69, 19, 0.2); }
      .billing-section { display: flex; gap: 30px; margin-bottom: 30px; }
      .billing-column { flex: 1; background: #fffacd; padding: 18px; border: 3px double #8b4513; }
      .billing-column strong { color: #8b4513; font-size: 15px; }
      table thead { background: #d2691e; border: 2px solid #8b4513; }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 12px; color: #fff; text-transform: uppercase; }
      table tr:nth-child(even) { background: #fffacd; }
      table td { border-bottom: 2px dotted #8b4513; padding: 12px; }
      .totals { margin: 30px 0; background: #ffd700; border: 3px solid #8b4513; padding: 20px; box-shadow: 6px 6px 0 rgba(139, 69, 19, 0.3); }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 8px 0; }
      .total-row.grand-total { font-size: 20px; font-weight: 700; color: #8b4513; border-top: 3px double #8b4513; padding-top: 12px; margin-top: 12px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 3px dashed #8b4513; font-size: 11px; color: #8b4513; text-align: center; }
      .notes { background: #fffacd; border: 2px solid #8b4513; padding: 15px; margin: 20px 0; font-size: 12px; }
    `,

    neon: `
      ${baseStyles}
      body { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #fff; }
      .container { background: #1a1a1a; border: 2px solid #00ffff; box-shadow: 0 0 20px #00ffff, inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; background: #000; padding: 30px; border: 2px solid #ff00ff; box-shadow: 0 0 15px #ff00ff; }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #00ffff; font-weight: 700; text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff; }
      .company-info p { font-size: 12px; color: #ff00ff; margin: 5px 0; text-shadow: 0 0 8px #ff00ff; }
      .invoice-title h2 { font-size: 36px; color: #ff00ff; margin-bottom: 12px; font-weight: 700; text-shadow: 0 0 15px #ff00ff, 0 0 30px #ff00ff; }
      .section { margin: 30px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #00ff00; margin-bottom: 12px; border-bottom: 2px solid #00ff00; padding-bottom: 6px; text-shadow: 0 0 10px #00ff00; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 30px; }
      .billing-column { flex: 1; background: #000; border: 2px solid #00ffff; padding: 18px; box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }
      .billing-column strong { color: #00ffff; font-size: 15px; text-shadow: 0 0 8px #00ffff; }
      .billing-column p { color: #fff; }
      table thead { background: #000; border-bottom: 3px solid #ff00ff; box-shadow: 0 0 10px rgba(255, 0, 255, 0.5); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 14px; color: #ff00ff; text-shadow: 0 0 8px #ff00ff; }
      table tr:nth-child(even) { background: rgba(0, 255, 255, 0.05); }
      table td { border-bottom: 1px solid #333; color: #fff; }
      .totals { margin: 30px 0; background: #000; border: 2px solid #00ff00; padding: 20px; box-shadow: 0 0 15px rgba(0, 255, 0, 0.5); }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 9px 0; color: #fff; }
      .total-row.grand-total { font-size: 22px; font-weight: 700; color: #00ff00; border-top: 2px solid #00ff00; padding-top: 12px; margin-top: 12px; text-shadow: 0 0 10px #00ff00; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #333; font-size: 11px; color: #888; text-align: center; }
      .notes { background: rgba(255, 0, 255, 0.1); border: 2px solid #ff00ff; padding: 16px; margin: 20px 0; font-size: 13px; color: #fff; box-shadow: 0 0 10px rgba(255, 0, 255, 0.3); }
    `,

    pastel: `
      ${baseStyles}
      body { font-family: 'Quicksand', 'Rounded', sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #ffd1dc 0%, #ffeaa7 50%, #dfe6e9 100%); padding: 35px; border-radius: 25px; }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #6c5ce7; font-weight: 600; }
      .company-info p { font-size: 12px; color: #636e72; margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #fd79a8; margin-bottom: 12px; font-weight: 600; }
      .section { margin: 35px 0; }
      .section-title { font-size: 12px; font-weight: 600; color: #6c5ce7; margin-bottom: 14px; background: #dfe6e9; padding: 10px 18px; border-radius: 20px; display: inline-block; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); padding: 22px; border-radius: 15px; }
      .billing-column strong { color: #2d3436; font-size: 15px; }
      table thead { background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%); border-radius: 10px 10px 0 0; }
      table th { font-size: 12px; font-weight: 600; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: #ffeaa7; }
      table td { border-bottom: 1px solid #dfe6e9; padding: 13px; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #ffd1dc 0%, #fd79a8 100%); color: #fff; padding: 25px; border-radius: 15px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; border-top: 2px solid rgba(255,255,255,0.5); padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #dfe6e9; font-size: 11px; color: #636e72; text-align: center; }
      .notes { background: #dfe6e9; padding: 18px; border-radius: 12px; border-left: 5px solid #6c5ce7; margin: 20px 0; font-size: 13px; }
    `,

    ocean: `
      ${baseStyles}
      body { font-family: 'Trebuchet MS', sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #005c97 0%, #363795 100%); padding: 35px; position: relative; overflow: hidden; }
      .header::before { content: ''; position: absolute; top: 0; left: 0; width: 200%; height: 100%; background: repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.05) 50px, rgba(255,255,255,0.05) 100px); animation: wave 20s linear infinite; }
      @keyframes wave { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #fff; font-weight: 600; position: relative; z-index: 1; }
      .company-info p { font-size: 12px; color: rgba(255,255,255,0.9); margin: 5px 0; position: relative; z-index: 1; }
      .invoice-title h2 { font-size: 36px; color: #fff; margin-bottom: 12px; font-weight: 600; position: relative; z-index: 1; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; color: #005c97; margin-bottom: 14px; border-bottom: 3px solid #00bcd4; padding-bottom: 8px; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); padding: 22px; border-radius: 12px; border-left: 5px solid #0097a7; }
      .billing-column strong { color: #00695c; font-size: 15px; }
      table thead { background: linear-gradient(135deg, #0097a7 0%, #00838f 100%); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: #e0f7fa; }
      table td { border-bottom: 1px solid #b2ebf2; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #006064 0%, #004d40 100%); color: #fff; padding: 25px; border-radius: 12px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; border-top: 2px solid rgba(255,255,255,0.5); padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #00bcd4; font-size: 11px; color: #00695c; text-align: center; }
      .notes { background: #e0f7fa; padding: 18px; border-left: 5px solid #00bcd4; margin: 20px 0; font-size: 13px; border-radius: 8px; }
    `,

    forest: `
      ${baseStyles}
      body { font-family: 'Georgia', serif; background: linear-gradient(135deg, #f5f5dc 0%, #d3d3d3 100%); }
      .container { background: #fffef7; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); padding: 35px; border-radius: 0 0 30px 30px; }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #fff; font-weight: 600; }
      .company-info p { font-size: 12px; color: #c8e6c9; margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #fff; margin-bottom: 12px; font-weight: 600; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; color: #2e7d32; margin-bottom: 14px; background: #e8f5e9; padding: 10px 15px; border-left: 5px solid #43a047; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: #f1f8e9; padding: 22px; border: 2px solid #81c784; border-radius: 10px; }
      .billing-column strong { color: #1b5e20; font-size: 15px; }
      table thead { background: linear-gradient(135deg, #388e3c 0%, #2e7d32 100%); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: #f1f8e9; }
      table td { border-bottom: 1px solid #c5e1a5; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #1b5e20 0%, #0d3f0d 100%); color: #fff; padding: 25px; border-radius: 12px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; border-top: 2px solid rgba(255,255,255,0.5); padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #81c784; font-size: 11px; color: #2e7d32; text-align: center; }
      .notes { background: #e8f5e9; padding: 18px; border-left: 5px solid #43a047; margin: 20px 0; font-size: 13px; }
    `,

    sunset: `
      ${baseStyles}
      body { font-family: 'Helvetica Neue', sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #feca57 100%); padding: 35px; }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #fff; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      .company-info p { font-size: 12px; color: rgba(255,255,255,0.95); margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #fff; margin-bottom: 12px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #ff6b6b; margin-bottom: 14px; border-bottom: 3px solid #ff8e53; padding-bottom: 8px; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: linear-gradient(135deg, #ffe5e5 0%, #fff4e5 100%); padding: 22px; border-radius: 15px; border: 2px solid #ff8e53; }
      .billing-column strong { color: #c23616; font-size: 15px; }
      table thead { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: #fff9f0; }
      table td { border-bottom: 1px solid #ffe5e5; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #c23616 0%, #a52a2a 100%); color: #fff; padding: 25px; border-radius: 15px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; border-top: 2px solid rgba(255,255,255,0.5); padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #ff8e53; font-size: 11px; color: #c23616; text-align: center; }
      .notes { background: #fff4e5; padding: 18px; border-left: 5px solid #feca57; margin: 20px 0; font-size: 13px; border-radius: 8px; }
    `,

    midnight: `
      ${baseStyles}
      body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0c1445; color: #e8eaf6; }
      .container { background: linear-gradient(135deg, #1a237e 0%, #0d1544 100%); border: 2px solid #5c6bc0; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #3949ab 0%, #283593 100%); padding: 35px; box-shadow: 0 4px 20px rgba(92, 107, 192, 0.3); }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #c5cae9; font-weight: 700; }
      .company-info p { font-size: 12px; color: #9fa8da; margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #c5cae9; margin-bottom: 12px; font-weight: 700; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #7986cb; margin-bottom: 14px; background: rgba(92, 107, 192, 0.2); padding: 10px 15px; border-left: 4px solid #5c6bc0; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: rgba(92, 107, 192, 0.15); padding: 22px; border: 2px solid #5c6bc0; border-radius: 10px; }
      .billing-column strong { color: #c5cae9; font-size: 15px; }
      .billing-column p { color: #e8eaf6; }
      table thead { background: linear-gradient(135deg, #303f9f 0%, #283593 100%); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: #c5cae9; }
      table tr:nth-child(even) { background: rgba(92, 107, 192, 0.1); }
      table td { border-bottom: 1px solid #3949ab; color: #e8eaf6; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #1a237e 0%, #0d1544 100%); border: 2px solid #5c6bc0; color: #e8eaf6; padding: 25px; box-shadow: 0 4px 15px rgba(92, 107, 192, 0.3); }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; color: #7986cb; border-top: 2px solid #5c6bc0; padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #3949ab; font-size: 11px; color: #9fa8da; text-align: center; }
      .notes { background: rgba(92, 107, 192, 0.15); border: 2px solid #5c6bc0; padding: 18px; margin: 20px 0; font-size: 13px; color: #e8eaf6; }
    `,

    candy: `
      ${baseStyles}
      body { font-family: 'Comic Sans MS', 'Marker Felt', cursive; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #ff6ec7 0%, #ffd3a5 50%, #a8edea 100%); padding: 35px; border-radius: 25px; box-shadow: 0 8px 20px rgba(255, 110, 199, 0.3); }
      .company-info h1 { font-size: 30px; margin-bottom: 12px; color: #ff006e; font-weight: 800; text-shadow: 2px 2px 0 rgba(255,255,255,0.5); }
      .company-info p { font-size: 13px; color: #8338ec; margin: 5px 0; font-weight: 600; }
      .invoice-title h2 { font-size: 38px; color: #ff006e; margin-bottom: 12px; font-weight: 800; text-shadow: 2px 2px 0 rgba(255,255,255,0.5); }
      .section { margin: 35px 0; }
      .section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; color: #fff; background: linear-gradient(135deg, #f72585 0%, #ff006e 100%); margin-bottom: 14px; padding: 12px 20px; border-radius: 20px; box-shadow: 0 4px 10px rgba(247, 37, 133, 0.3); }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: linear-gradient(135deg, #ffd3a5 0%, #ffe8d6 100%); padding: 22px; border-radius: 20px; border: 4px solid #ff9671; box-shadow: 0 4px 10px rgba(255, 150, 113, 0.2); }
      .billing-column strong { color: #ff006e; font-size: 16px; }
      table thead { background: linear-gradient(135deg, #8338ec 0%, #3a0ca3 100%); border-radius: 15px 15px 0 0; }
      table th { font-size: 13px; font-weight: 800; text-align: left; padding: 16px; color: #fff; }
      table tr:nth-child(even) { background: linear-gradient(135deg, #ffd3a5 0%, #ffe8d6 100%); }
      table td { border-bottom: 2px solid #ff9671; padding: 14px; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #f72585 0%, #ff006e 100%); color: #fff; padding: 28px; border-radius: 20px; box-shadow: 0 8px 20px rgba(247, 37, 133, 0.4); }
      .total-row { display: flex; justify-content: flex-end; font-size: 16px; margin: 11px 0; }
      .total-row.grand-total { font-size: 28px; font-weight: 800; border-top: 3px solid rgba(255,255,255,0.5); padding-top: 16px; margin-top: 16px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 3px solid #ff9671; font-size: 12px; color: #8338ec; text-align: center; font-weight: 600; }
      .notes { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 20px; border-radius: 15px; border: 3px solid #8338ec; margin: 20px 0; font-size: 14px; box-shadow: 0 4px 10px rgba(131, 56, 236, 0.2); }
    `,

    industrial: `
      ${baseStyles}
      body { font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif; background: #37474f; }
      .container { background: #eceff1; border: 3px solid #263238; box-shadow: inset 0 0 0 8px #546e7a; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; background: repeating-linear-gradient(45deg, #263238, #263238 10px, #37474f 10px, #37474f 20px); padding: 30px; }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #ffd54f; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; }
      .company-info p { font-size: 11px; color: #cfd8dc; margin: 4px 0; text-transform: uppercase; }
      .invoice-title h2 { font-size: 36px; color: #ffd54f; margin-bottom: 12px; font-weight: 900; letter-spacing: 4px; }
      .section { margin: 32px 0; }
      .section-title { font-size: 11px; font-weight: 900; text-transform: uppercase; color: #263238; background: #ffd54f; margin-bottom: 12px; padding: 8px 12px; letter-spacing: 2px; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 32px; }
      .billing-column { flex: 1; background: #263238; color: #eceff1; padding: 20px; border: 3px solid #37474f; }
      .billing-column strong { color: #ffd54f; font-size: 14px; font-weight: 900; }
      .billing-column p { color: #cfd8dc; }
      table thead { background: #263238; }
      table th { font-size: 11px; font-weight: 900; text-align: left; padding: 14px; color: #ffd54f; text-transform: uppercase; letter-spacing: 1px; }
      table tr:nth-child(even) { background: #cfd8dc; }
      table td { border-bottom: 2px solid #90a4ae; padding: 12px; font-weight: 600; }
      .totals { margin: 32px 0; background: #263238; color: #ffd54f; padding: 22px; border: 3px solid #37474f; }
      .total-row { display: flex; justify-content: flex-end; font-size: 14px; margin: 9px 0; }
      .total-row.grand-total { font-size: 22px; font-weight: 900; border-top: 3px solid #ffd54f; padding-top: 12px; margin-top: 12px; letter-spacing: 2px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 3px solid #263238; font-size: 10px; color: #546e7a; text-align: center; text-transform: uppercase; }
      .notes { background: #cfd8dc; border: 3px solid #263238; padding: 16px; margin: 20px 0; font-size: 12px; font-weight: 600; }
    `,

    vintage: `
      ${baseStyles}
      body { font-family: 'Garamond', 'Times New Roman', serif; background: #f4e8d8; }
      .container { background: #fffef9; border: 8px double #8b7355; box-shadow: 0 0 0 2px #d4a574; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: #8b7355; padding: 30px; border: 4px solid #d4a574; position: relative; }
      .header::before { content: ''; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 1px solid rgba(255,255,255,0.3); pointer-events: none; }
      .company-info h1 { font-size: 30px; margin-bottom: 12px; color: #fffef9; font-weight: 400; font-style: italic; }
      .company-info p { font-size: 12px; color: #f4e8d8; margin: 5px 0; }
      .invoice-title h2 { font-size: 38px; color: #fffef9; margin-bottom: 12px; font-weight: 400; font-style: italic; }
      .section { margin: 35px 0; }
      .section-title { font-size: 14px; font-weight: 600; color: #8b7355; margin-bottom: 14px; border-bottom: 2px solid #d4a574; padding-bottom: 8px; font-style: italic; text-align: center; }
      .billing-section { display: flex; gap: 35px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: #f9f6f0; padding: 22px; border: 3px double #8b7355; }
      .billing-column strong { color: #5d4e37; font-size: 15px; font-style: italic; }
      table thead { background: #8b7355; border: 2px solid #d4a574; }
      table th { font-size: 12px; font-weight: 600; text-align: left; padding: 14px; color: #fffef9; font-style: italic; }
      table tr:nth-child(even) { background: #f9f6f0; }
      table td { border-bottom: 1px solid #d4a574; }
      .totals { margin: 35px 0; background: #f4e8d8; border: 4px double #8b7355; padding: 24px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; color: #5d4e37; }
      .total-row.grand-total { font-size: 22px; font-weight: 600; border-top: 2px solid #8b7355; padding-top: 14px; margin-top: 14px; font-style: italic; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #d4a574; font-size: 11px; color: #8b7355; text-align: center; font-style: italic; }
      .notes { background: #f9f6f0; border: 2px solid #8b7355; padding: 18px; margin: 20px 0; font-size: 13px; font-style: italic; }
    `,

    futuristic: `
      ${baseStyles}
      body { font-family: 'Orbitron', 'Futura', sans-serif; background: radial-gradient(circle, #1e3c72 0%, #0f2027 100%); color: #00d4ff; }
      .container { background: linear-gradient(135deg, #0a1929 0%, #132f4c 100%); border: 2px solid #00d4ff; box-shadow: 0 0 30px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(0, 212, 255, 0.1); }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #004d7a 0%, #008793 100%); padding: 32px; border: 2px solid #00d4ff; clip-path: polygon(0 0, 100% 0, 98% 100%, 2% 100%); }
      .company-info h1 { font-size: 30px; margin-bottom: 12px; color: #00d4ff; font-weight: 700; text-shadow: 0 0 15px #00d4ff; text-transform: uppercase; letter-spacing: 4px; }
      .company-info p { font-size: 11px; color: #66d9ef; margin: 5px 0; }
      .invoice-title h2 { font-size: 38px; color: #00d4ff; margin-bottom: 12px; font-weight: 700; text-shadow: 0 0 20px #00d4ff; letter-spacing: 5px; }
      .section { margin: 35px 0; }
      .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #00d4ff; background: rgba(0, 212, 255, 0.15); margin-bottom: 14px; padding: 10px 16px; clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%); letter-spacing: 2px; box-shadow: 0 0 10px rgba(0, 212, 255, 0.3); }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: rgba(0, 212, 255, 0.1); border: 2px solid #00d4ff; padding: 22px; clip-path: polygon(0 0, 98% 0, 100% 100%, 2% 100%); }
      .billing-column strong { color: #00d4ff; font-size: 15px; }
      .billing-column p { color: #66d9ef; }
      table thead { background: linear-gradient(135deg, #004d7a 0%, #008793 100%); border-bottom: 2px solid #00d4ff; }
      table th { font-size: 11px; font-weight: 700; text-align: left; padding: 14px; color: #00d4ff; text-transform: uppercase; letter-spacing: 1px; }
      table tr:nth-child(even) { background: rgba(0, 212, 255, 0.05); }
      table td { border-bottom: 1px solid rgba(0, 212, 255, 0.3); color: #66d9ef; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #004d7a 0%, #008793 100%); border: 2px solid #00d4ff; color: #00d4ff; padding: 25px; box-shadow: 0 0 25px rgba(0, 212, 255, 0.4); }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 26px; font-weight: 700; border-top: 2px solid #00d4ff; padding-top: 15px; margin-top: 15px; text-shadow: 0 0 15px #00d4ff; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid rgba(0, 212, 255, 0.5); font-size: 10px; color: #66d9ef; text-align: center; }
      .notes { background: rgba(0, 212, 255, 0.1); border: 2px solid #00d4ff; padding: 18px; margin: 20px 0; font-size: 12px; color: #66d9ef; box-shadow: 0 0 15px rgba(0, 212, 255, 0.2); }
    `,

    'minimalist-pro': `
      ${baseStyles}
      body { font-family: 'Helvetica Neue', 'Helvetica', sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 70px; border-bottom: 1px solid #000; padding-bottom: 30px; }
      .company-info h1 { font-size: 20px; margin-bottom: 20px; color: #000; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; }
      .company-info p { font-size: 10px; color: #555; margin: 2px 0; letter-spacing: 1px; }
      .invoice-title h2 { font-size: 24px; color: #000; margin-bottom: 20px; font-weight: 200; letter-spacing: 8px; text-transform: uppercase; }
      .invoice-meta { font-size: 10px; color: #555; letter-spacing: 1px; }
      .section { margin: 50px 0; }
      .section-title { font-size: 9px; font-weight: 500; text-transform: uppercase; color: #000; margin-bottom: 20px; letter-spacing: 3px; }
      .billing-section { display: flex; gap: 80px; margin-bottom: 50px; }
      .billing-column { flex: 1; }
      .billing-column p { font-size: 11px; margin: 3px 0; line-height: 1.8; }
      .billing-column strong { color: #000; font-size: 12px; font-weight: 400; letter-spacing: 1px; }
      table thead { background: transparent; border-bottom: 0.5px solid #000; }
      table th { font-size: 9px; font-weight: 500; text-align: left; padding: 10px 0; color: #000; text-transform: uppercase; letter-spacing: 2px; }
      table tr { border-bottom: 0.5px solid #e0e0e0; }
      table td { padding: 15px 0; font-size: 11px; }
      .totals { margin: 50px 0; }
      .total-row { display: flex; justify-content: flex-end; font-size: 12px; margin: 10px 0; }
      .total-row .label { width: 140px; font-weight: 300; letter-spacing: 1px; }
      .total-row .value { width: 90px; text-align: right; }
      .total-row.grand-total { font-size: 16px; font-weight: 400; border-top: 0.5px solid #000; padding-top: 15px; margin-top: 15px; letter-spacing: 2px; }
      .footer { margin-top: 70px; padding-top: 20px; border-top: 0.5px solid #e0e0e0; font-size: 9px; color: #999; text-align: center; letter-spacing: 1px; }
      .notes { padding: 20px 0; margin: 30px 0; font-size: 11px; color: #555; line-height: 1.8; }
    `,

    colorful: `
      ${baseStyles}
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); }
      .container { background: #fff; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 35px; }
      .company-info h1 { font-size: 30px; margin-bottom: 12px; color: #fff; font-weight: 800; }
      .company-info p { font-size: 12px; color: rgba(255,255,255,0.95); margin: 5px 0; }
      .invoice-title h2 { font-size: 38px; color: #fff; margin-bottom: 12px; font-weight: 800; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; margin-bottom: 14px; padding: 10px 16px; border-radius: 8px; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 22px; border-radius: 12px; border-left: 5px solid #f5576c; }
      .billing-column strong { color: #c23616; font-size: 15px; }
      table thead { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); }
      table tr:hover { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
      table td { border-bottom: 1px solid #e0e0e0; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: #fff; padding: 25px; border-radius: 12px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 800; border-top: 2px solid rgba(255,255,255,0.5); padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #e0e0e0; font-size: 11px; color: #666; text-align: center; }
      .notes { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 18px; border-radius: 10px; margin: 20px 0; font-size: 13px; }
    `,

    monochrome: `
      ${baseStyles}
      body { font-family: 'Arial', sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: #000; padding: 32px; }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #fff; font-weight: 700; }
      .company-info p { font-size: 12px; color: #ccc; margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #fff; margin-bottom: 12px; font-weight: 700; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #000; background: #e0e0e0; margin-bottom: 14px; padding: 10px 15px; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: #f5f5f5; padding: 22px; border: 2px solid #000; }
      .billing-column strong { color: #000; font-size: 15px; }
      table thead { background: #000; }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: #f5f5f5; }
      table td { border-bottom: 1px solid #ccc; }
      .totals { margin: 35px 0; background: #000; color: #fff; padding: 25px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; border-top: 2px solid #fff; padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #000; font-size: 11px; color: #666; text-align: center; }
      .notes { background: #f5f5f5; border: 2px solid #000; padding: 18px; margin: 20px 0; font-size: 13px; }
    `,

    gradient: `
      ${baseStyles}
      body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%); }
      .container { background: #fff; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 75%, #53a0fd 100%); padding: 35px; }
      .company-info h1 { font-size: 30px; margin-bottom: 12px; color: #fff; font-weight: 700; }
      .company-info p { font-size: 12px; color: rgba(255,255,255,0.95); margin: 5px 0; }
      .invoice-title h2 { font-size: 38px; color: #fff; margin-bottom: 12px; font-weight: 700; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; margin-bottom: 14px; padding: 10px 16px; border-radius: 8px; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: linear-gradient(135deg, #e0c3fc 0%, #d9e7ff 100%); padding: 22px; border-radius: 12px; }
      .billing-column strong { color: #4a148c; font-size: 15px; }
      table thead { background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); }
      table td { border-bottom: 1px solid #e0e0e0; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #fc466b 0%, #3f5efb 100%); color: #fff; padding: 25px; border-radius: 12px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; border-top: 2px solid rgba(255,255,255,0.5); padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #e0e0e0; font-size: 11px; color: #666; text-align: center; }
      .notes { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 18px; border-radius: 10px; margin: 20px 0; font-size: 13px; }
    `,

    geometric: `
      ${baseStyles}
      body { font-family: 'Montserrat', sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: repeating-linear-gradient(45deg, #2c3e50, #2c3e50 20px, #34495e 20px, #34495e 40px); padding: 35px; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), 0 100%); }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #ecf0f1; font-weight: 700; }
      .company-info p { font-size: 12px; color: #bdc3c7; margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #ecf0f1; margin-bottom: 12px; font-weight: 700; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #fff; background: #e74c3c; margin-bottom: 14px; padding: 10px 16px; clip-path: polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%); }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: #ecf0f1; padding: 22px; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), 0 100%); border-left: 5px solid #3498db; }
      .billing-column strong { color: #2c3e50; font-size: 15px; }
      table thead { background: repeating-linear-gradient(90deg, #3498db, #3498db 30px, #2980b9 30px, #2980b9 60px); }
      table th { font-size: 12px; font-weight: 700; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: #ecf0f1; }
      table td { border-bottom: 2px solid #bdc3c7; }
      .totals { margin: 35px 0; background: #2c3e50; color: #ecf0f1; padding: 25px; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), 0 100%); }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; color: #e74c3c; border-top: 2px solid #e74c3c; padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #bdc3c7; font-size: 11px; color: #7f8c8d; text-align: center; }
      .notes { background: #ecf0f1; border-left: 5px solid #e74c3c; padding: 18px; margin: 20px 0; font-size: 13px; }
    `,

    organic: `
      ${baseStyles}
      body { font-family: 'Lora', 'Georgia', serif; background: #faf9f6; }
      .container { background: #fffef9; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 45px; background: linear-gradient(135deg, #6a9c89 0%, #3d7068 100%); padding: 35px; border-radius: 30px 30px 0 0; }
      .company-info h1 { font-size: 28px; margin-bottom: 12px; color: #f5f5dc; font-weight: 600; }
      .company-info p { font-size: 12px; color: #d4e4d4; margin: 5px 0; }
      .invoice-title h2 { font-size: 36px; color: #f5f5dc; margin-bottom: 12px; font-weight: 600; }
      .section { margin: 35px 0; }
      .section-title { font-size: 13px; font-weight: 600; color: #3d7068; margin-bottom: 14px; background: #e8f3e8; padding: 10px 18px; border-radius: 20px; }
      .billing-section { display: flex; gap: 30px; margin-bottom: 35px; }
      .billing-column { flex: 1; background: #f0f7f0; padding: 22px; border-radius: 20px; border: 2px solid #c8dcc8; }
      .billing-column strong { color: #2d5a50; font-size: 15px; }
      table thead { background: linear-gradient(135deg, #87a78f 0%, #6a9c89 100%); border-radius: 15px 15px 0 0; }
      table th { font-size: 12px; font-weight: 600; text-align: left; padding: 15px; color: #fff; }
      table tr:nth-child(even) { background: #f9fdf9; }
      table td { border-bottom: 1px solid #d4e4d4; }
      .totals { margin: 35px 0; background: linear-gradient(135deg, #3d7068 0%, #2d5a50 100%); color: #f5f5dc; padding: 25px; border-radius: 15px; }
      .total-row { display: flex; justify-content: flex-end; font-size: 15px; margin: 10px 0; }
      .total-row.grand-total { font-size: 24px; font-weight: 700; border-top: 2px solid rgba(245, 245, 220, 0.5); padding-top: 14px; margin-top: 14px; }
      .footer { margin-top: 45px; padding-top: 20px; border-top: 2px solid #c8dcc8; font-size: 11px; color: #6a9c89; text-align: center; }
      .notes { background: #f0f7f0; padding: 18px; border-radius: 15px; border-left: 5px solid #6a9c89; margin: 20px 0; font-size: 13px; }
    `,

    swiss: `
      ${baseStyles}
      body { font-family: 'Helvetica', 'Arial', sans-serif; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 60px; }
      .company-info h1 { font-size: 22px; margin-bottom: 18px; color: #000; font-weight: 700; }
      .company-info p { font-size: 10px; color: #333; margin: 2px 0; line-height: 1.6; }
      .invoice-title h2 { font-size: 28px; color: #e31e24; margin-bottom: 18px; font-weight: 700; }
      .invoice-meta { font-size: 10px; color: #333; }
      .section { margin: 45px 0; }
      .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #000; margin-bottom: 16px; letter-spacing: 2px; }
      .billing-section { display: flex; gap: 50px; margin-bottom: 45px; }
      .billing-column { flex: 1; }
      .billing-column p { font-size: 11px; margin: 2px 0; line-height: 1.7; }
      .billing-column strong { color: #000; font-size: 12px; font-weight: 700; }
      table { border-top: 1px solid #000; border-bottom: 1px solid #000; }
      table thead { background: transparent; }
      table th { font-size: 10px; font-weight: 700; text-align: left; padding: 12px 0; color: #000; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #ccc; }
      table tr { border: none; }
      table td { padding: 12px 0; font-size: 11px; border-bottom: 1px solid #eee; }
      .totals { margin: 45px 0; }
      .total-row { display: flex; justify-content: flex-end; font-size: 11px; margin: 8px 0; }
      .total-row .label { width: 130px; font-weight: 400; }
      .total-row .value { width: 90px; text-align: right; font-weight: 700; }
      .total-row.grand-total { font-size: 16px; font-weight: 700; color: #e31e24; border-top: 2px solid #000; padding-top: 12px; margin-top: 12px; }
      .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 9px; color: #666; text-align: left; line-height: 1.6; }
      .notes { padding: 16px 0; margin: 30px 0; font-size: 11px; color: #333; line-height: 1.7; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
    `
  };

  return templateStyles[template] || templateStyles.professional;
};
