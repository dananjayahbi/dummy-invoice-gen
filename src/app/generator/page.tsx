'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Shuffle, Eye, FileText, Palette, Home, Mail } from 'lucide-react';
import { InvoiceGeneratorForm, InvoiceGeneratorFormRef } from './components/InvoiceGeneratorForm';
import { InvoicePreview } from './components/InvoicePreview';
import { TemplateChooserModal } from './components/TemplateChooserModal';
import { EmailInvoiceModal } from './components/EmailInvoiceModal';
import { generatePDFBase64 } from '@/lib/utils/pdf-generator';
import { InvoiceTemplate, InvoiceData } from '@/types/invoice';

export default function GeneratorPage() {
  const [previewHTML, setPreviewHTML] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>('invoice');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [showPreviewButtons, setShowPreviewButtons] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplate>('professional');
  const [pdfBase64, setPdfBase64] = useState<string>('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [currentInvoiceData, setCurrentInvoiceData] = useState<InvoiceData | null>(null);
  const [invoiceSummary, setInvoiceSummary] = useState({
    companyName: '',
    clientName: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    totalAmount: 0,
  });
  const formRef = useRef<InvoiceGeneratorFormRef>(null);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  console.log('GeneratorPage rendered, selectedTemplate:', selectedTemplate);

  // Log selectedTemplate changes
  useEffect(() => {
    console.log('selectedTemplate state changed to:', selectedTemplate);
  }, [selectedTemplate]);

  const handlePreview = (html: string, company: string, invoiceData: InvoiceData, summaryData: {
    companyName: string;
    clientName: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    totalAmount: number;
  }) => {
    console.log('handlePreview called, HTML length:', html.length);
    // Sanitize company name for filename
    const sanitizedName = company
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
    
    // Generate 4-digit random ID
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const filenameWithId = sanitizedName ? `${sanitizedName}-${randomId}` : `invoice-${randomId}`;
    
    setCompanyName(filenameWithId);
    setPreviewHTML(html);
    setCurrentInvoiceData(invoiceData);
    setInvoiceSummary(summaryData);
    setShowPreviewButtons(true);
    // Don't auto-switch tabs - let user control tab navigation
  };

  // Update iframe when preview HTML changes
  useEffect(() => {
    console.log('Preview HTML updated, length:', previewHTML?.length || 0);
    if (previewIframeRef.current && previewHTML) {
      previewIframeRef.current.srcdoc = previewHTML;
      console.log('Iframe srcdoc set');
      
      // Resize iframe to fit content after load
      const iframe = previewIframeRef.current;
      iframe.onload = () => {
        try {
          const height = iframe.contentWindow?.document.body.scrollHeight;
          if (height) {
            iframe.style.height = `${height}px`;
            console.log('Iframe height set to:', height);
          }
        } catch (e) {
          console.error('Error resizing iframe:', e);
        }
      };
    }
  }, [previewHTML]);

  // Update iframe when switching to preview tab
  useEffect(() => {
    if (activeTab === 'preview' && previewIframeRef.current && previewHTML) {
      // Small delay to ensure iframe is mounted
      setTimeout(() => {
        if (previewIframeRef.current && previewHTML) {
          previewIframeRef.current.srcdoc = previewHTML;
          console.log('Iframe updated on tab switch');
          
          // Also resize on tab switch
          const iframe = previewIframeRef.current;
          iframe.onload = () => {
            try {
              const height = iframe.contentWindow?.document.body.scrollHeight;
              if (height) {
                iframe.style.height = `${height}px`;
              }
            } catch (e) {
              console.error('Error resizing iframe on tab switch:', e);
            }
          };
        }
      }, 100);
    }
  }, [activeTab, previewHTML]);

  const handleGenerateRandom = () => {
    if (formRef.current) {
      formRef.current.generateRandomData();
    }
  };

  const handlePreviewClick = () => {
    setShowPreviewButtons(true);
    setActiveTab('preview');
  };

  const handleTemplateSelect = (template: InvoiceTemplate) => {
    console.log('handleTemplateSelect called with template:', template);
    setSelectedTemplate(template);
    // Trigger preview update immediately with new template
    // Use longer delay to ensure state has propagated
    setTimeout(() => {
      console.log('Attempting to trigger preview, formRef.current exists:', !!formRef.current);
      if (formRef.current) {
        console.log('Manually triggering preview after template change');
        formRef.current.triggerPreview();
      } else {
        console.warn('formRef.current is null, cannot trigger preview');
      }
    }, 100);
  };

  // Generate PDF base64 when email modal opens - with delay to let modal render first
  useEffect(() => {
    const generatePDF = async () => {
      if (!isEmailModalOpen) {
        // Clear PDF when modal closes
        setPdfBase64('');
      }
    };
    generatePDF();
  }, [isEmailModalOpen]);

  // Handle email button click - generate PDF first, then open modal
  const handleEmailClick = async () => {
    if (!currentInvoiceData) return;
    
    setIsGeneratingEmail(true);
    try {
      // Generate PDF in background before opening modal
      const base64 = await generatePDFBase64(currentInvoiceData);
      setPdfBase64(base64);
      
      // Open modal only after PDF is ready
      setIsEmailModalOpen(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Left Sidebar - Toolbar (1/4) */}
      <aside className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Back to home"
            >
              <Home className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">BVS Test Invoice Generator</h1>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={handleGenerateRandom}
            className="w-full px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 font-medium rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
          >
            <Shuffle className="w-5 h-5" />
            Generate Random Data
          </button>

          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="w-full px-4 py-3 bg-purple-50 border border-purple-200 text-purple-700 font-medium rounded-lg hover:bg-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
          >
            <Palette className="w-5 h-5" />
            Choose Template
          </button>

          <button
            onClick={handlePreviewClick}
            className="w-full px-4 py-3 bg-green-50 border border-green-200 text-green-700 font-medium rounded-lg hover:bg-green-100 hover:border-green-300 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Preview Invoice
          </button>

          {showPreviewButtons && previewHTML && currentInvoiceData && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <p className="text-sm font-medium text-gray-700">Actions:</p>
              <InvoicePreview html={previewHTML} invoiceData={currentInvoiceData} filename={companyName} minimal={true} />
              
              <button
                onClick={handleEmailClick}
                disabled={isGeneratingEmail}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-200 text-orange-700 font-medium rounded-lg hover:bg-orange-100 hover:border-orange-300 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGeneratingEmail ? (
                  <>
                    <div className="w-5 h-5 border-2 border-orange-700 border-t-transparent rounded-full animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Email the Invoice
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="mt-auto p-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">All processing happens locally. No data is sent to any server.</p>
        </div>
      </aside>

      {/* Right Content Area (3/4) */}
      <main className="w-3/4 flex flex-col">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-4 font-medium transition flex items-center gap-2 ${
                activeTab === 'form'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-5 h-5" />
              Form
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-4 font-medium transition flex items-center gap-2 ${
                activeTab === 'preview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {/* Form Tab - Always mounted, hidden when not active */}
          <div className={activeTab === 'form' ? 'p-8 block' : 'hidden'}>
            <InvoiceGeneratorForm ref={formRef} onPreview={handlePreview} template={selectedTemplate} />
          </div>

          {/* Preview Tab - Always mounted, hidden when not active */}
          <div className={activeTab === 'preview' ? 'p-8 bg-gray-100 block' : 'hidden'}>
            {previewHTML ? (
              <div className="flex justify-center">
                <iframe
                  ref={previewIframeRef}
                  title="Invoice Preview"
                  className="bg-white shadow-2xl border-none"
                  style={{
                    width: '210mm',
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                  sandbox="allow-same-origin"
                  scrolling="no"
                />
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg font-semibold">Generating preview...</p>
                <p className="text-sm mt-2">The invoice preview will appear here automatically</p>
                <p className="text-xs mt-4 text-gray-400">If preview doesn't appear, try switching to Form tab and back</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Template Chooser Modal */}
      <TemplateChooserModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentTemplate={selectedTemplate}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Email Invoice Modal */}
      {isEmailModalOpen && currentInvoiceData && (
        <EmailInvoiceModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          pdfBase64={pdfBase64}
          companyName={invoiceSummary.companyName}
          clientName={invoiceSummary.clientName}
          invoiceNumber={invoiceSummary.invoiceNumber}
          invoiceDate={invoiceSummary.invoiceDate}
          dueDate={invoiceSummary.dueDate}
          totalAmount={invoiceSummary.totalAmount}
        />
      )}
    </div>
  );
}
