'use client';

import React, { useRef, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { downloadInvoicePDF, printInvoice } from '@/lib/utils/pdf-generator';
import { InvoiceData } from '@/types/invoice';

interface InvoicePreviewProps {
  html: string;
  invoiceData: InvoiceData;
  filename?: string;
  minimal?: boolean; // For toolbar mode - only show buttons, no iframe
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ html, invoiceData, filename = 'invoice', minimal = false }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);
    try {
      await downloadInvoicePDF(invoiceData, `${filename}.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    try {
      printInvoice(html);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to print invoice');
    }
  };

  React.useEffect(() => {
    if (iframeRef.current && !minimal) {
      iframeRef.current.srcdoc = html;
    }
  }, [html, minimal]);

  // Minimal mode - only show buttons (for toolbar)
  if (minimal) {
    return (
      <div className="space-y-3">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </button>
        <button
          onClick={handlePrint}
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? 'Generating PDF...' : 'Download PDF'}
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <iframe
          ref={iframeRef}
          title="Invoice Preview"
          className="w-full h-screen border-none"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
};
