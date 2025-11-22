'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { InvoiceTemplate } from '@/types/invoice';
import { generateInvoiceHTML } from '@/lib/utils/invoice-generator';

interface TemplateChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: InvoiceTemplate;
  onSelectTemplate: (template: InvoiceTemplate) => void;
}

const TEMPLATES: Array<{ value: InvoiceTemplate; label: string; description: string; color: string }> = [
  { value: 'professional', label: 'Professional', description: 'Classic blue with clean layout', color: 'bg-blue-500' },
  { value: 'modern', label: 'Modern', description: 'Gradient header with rounded corners', color: 'bg-purple-500' },
  { value: 'classic', label: 'Classic', description: 'Traditional serif fonts with formal styling', color: 'bg-gray-700' },
  { value: 'minimal', label: 'Minimal', description: 'Ultra-clean with maximum whitespace', color: 'bg-gray-400' },
  { value: 'bold', label: 'Bold', description: 'High contrast black and white', color: 'bg-black' },
  { value: 'elegant', label: 'Elegant', description: 'Gold accents with refined typography', color: 'bg-yellow-600' },
  { value: 'corporate', label: 'Corporate', description: 'Dark professional business theme', color: 'bg-indigo-900' },
  { value: 'creative', label: 'Creative', description: 'Colorful gradients and vibrant design', color: 'bg-gradient-to-r from-pink-500 to-orange-500' },
  { value: 'simple', label: 'Simple', description: 'Basic no-frills layout', color: 'bg-gray-500' },
  { value: 'tech', label: 'Tech', description: 'Dark mode with monospace fonts', color: 'bg-green-700' },
  { value: 'luxury', label: 'Luxury', description: 'Premium gold and black design', color: 'bg-gradient-to-r from-yellow-600 to-yellow-800' },
  { value: 'startup', label: 'Startup', description: 'Fresh gradient with modern vibes', color: 'bg-gradient-to-r from-cyan-400 to-green-400' },
  { value: 'retro', label: 'Retro', description: 'Vintage brown tones with dashed borders', color: 'bg-orange-700' },
  { value: 'neon', label: 'Neon', description: 'Glowing cyberpunk aesthetic', color: 'bg-gradient-to-r from-cyan-500 to-purple-500' },
  { value: 'pastel', label: 'Pastel', description: 'Soft colors with rounded elements', color: 'bg-gradient-to-r from-pink-200 to-yellow-200' },
  { value: 'ocean', label: 'Ocean', description: 'Deep blue waves and aquatic theme', color: 'bg-gradient-to-r from-blue-600 to-blue-800' },
  { value: 'forest', label: 'Forest', description: 'Natural green earthy tones', color: 'bg-gradient-to-r from-green-600 to-green-800' },
  { value: 'sunset', label: 'Sunset', description: 'Warm orange and pink gradients', color: 'bg-gradient-to-r from-red-400 to-orange-400' },
  { value: 'midnight', label: 'Midnight', description: 'Dark indigo night sky theme', color: 'bg-gradient-to-r from-indigo-900 to-indigo-700' },
  { value: 'candy', label: 'Candy', description: 'Sweet playful bright colors', color: 'bg-gradient-to-r from-pink-400 to-purple-400' },
  { value: 'industrial', label: 'Industrial', description: 'Metallic gray with yellow accents', color: 'bg-gray-700' },
  { value: 'vintage', label: 'Vintage', description: 'Classic brown parchment style', color: 'bg-amber-700' },
  { value: 'futuristic', label: 'Futuristic', description: 'Sci-fi cyan with angular design', color: 'bg-gradient-to-r from-cyan-600 to-blue-700' },
  { value: 'minimalist-pro', label: 'Minimalist Pro', description: 'Ultimate clean professional minimal', color: 'bg-gray-300' },
  { value: 'colorful', label: 'Colorful', description: 'Vibrant rainbow gradients everywhere', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { value: 'monochrome', label: 'Monochrome', description: 'Pure black and white contrast', color: 'bg-gray-900' },
  { value: 'gradient', label: 'Gradient', description: 'Multi-color gradient paradise', color: 'bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400' },
  { value: 'geometric', label: 'Geometric', description: 'Angular shapes and clip-paths', color: 'bg-slate-700' },
  { value: 'organic', label: 'Organic', description: 'Natural earthy green tones', color: 'bg-emerald-600' },
  { value: 'swiss', label: 'Swiss', description: 'Clean Helvetica-based design', color: 'bg-red-600' },
];

// Sample invoice data for preview
const SAMPLE_DATA = {
  company: {
    name: 'Sample Company Inc.',
    email: 'hello@sample.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    website: 'www.sample.com',
  },
  client: {
    name: 'Client Corp',
    email: 'contact@client.com',
    phone: '+1 (555) 987-6543',
    address: '456 Client Ave, Town, State 67890',
  },
  invoiceNumber: 'INV-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  lineItems: [
    { description: 'Professional Services', quantity: 1, unitPrice: 1000 },
    { description: 'Consulting Fees', quantity: 5, unitPrice: 200 },
  ],
  taxDetails: { taxName: 'GST', rate: 10 },
  bankDetails: {
    accountName: 'Sample Company Inc.',
    accountNumber: '1234567890',
    bankName: 'Sample Bank',
    bsb: '123456',
    swiftCode: 'SAMPAUS',
    iban: '',
  },
  paymentTerms: 'Payment due within 30 days',
  notes: 'Thank you for your business!',
  includeInvoiceNumber: true,
  includeBankDetails: true,
  includeTaxDetails: true,
  includePaymentTerms: true,
  fieldVisibility: {
    companyEmail: true,
    companyPhone: true,
    companyAddress: true,
    companyWebsite: true,
    clientEmail: true,
    clientPhone: true,
    clientAddress: true,
    dueDate: true,
    bankAccountName: true,
    bankAccountNumber: true,
    bankName: true,
    bankBSB: true,
    bankSwiftCode: true,
    bankIBAN: false,
  },
};

export const TemplateChooserModal: React.FC<TemplateChooserModalProps> = ({
  isOpen,
  onClose,
  currentTemplate,
  onSelectTemplate,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplate>(currentTemplate);
  const [previewHTML, setPreviewHTML] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  console.log('TemplateChooserModal rendered, isOpen:', isOpen, 'selectedTemplate:', selectedTemplate, 'currentTemplate:', currentTemplate);

  // Update selected template when currentTemplate prop changes or modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, resetting selectedTemplate to currentTemplate:', currentTemplate);
      setSelectedTemplate(currentTemplate);
    }
  }, [isOpen, currentTemplate]);

  // Generate preview when template changes or modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Generating preview HTML for template:', selectedTemplate);
      const html = generateInvoiceHTML({
        ...SAMPLE_DATA,
        template: selectedTemplate,
      });
      setPreviewHTML(html);
      console.log('Preview HTML generated, length:', html.length);
    }
  }, [selectedTemplate, isOpen]);

  // Update iframe when preview HTML changes
  useEffect(() => {
    if (iframeRef.current && previewHTML) {
      iframeRef.current.srcdoc = previewHTML;
    }
  }, [previewHTML]);

  // Force iframe update when modal opens (handles case where previewHTML is same as previous session)
  useEffect(() => {
    if (isOpen && iframeRef.current && previewHTML) {
      // Small delay to ensure iframe is rendered
      setTimeout(() => {
        if (iframeRef.current && previewHTML) {
          iframeRef.current.srcdoc = previewHTML;
        }
      }, 50);
    }
  }, [isOpen, previewHTML]);

  const handleSelect = () => {
    console.log('Modal handleSelect called, selectedTemplate:', selectedTemplate);
    onSelectTemplate(selectedTemplate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose Invoice Template</h2>
            <p className="text-sm text-gray-600 mt-1">Select a template and see a live preview</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Template Selection */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto p-6">
            <div className="space-y-3">
              {TEMPLATES.map((template) => (
                <button
                  key={template.value}
                  onClick={() => {
                    console.log('Template clicked in modal:', template.value);
                    setSelectedTemplate(template.value);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selectedTemplate === template.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${template.color} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{template.label}</h3>
                      <p className="text-sm text-gray-600 truncate">{template.description}</p>
                    </div>
                    {selectedTemplate === template.value && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="w-2/3 overflow-y-auto bg-gray-100 p-6">
            <div className="flex justify-center">
              <iframe
                ref={iframeRef}
                title="Template Preview"
                className="bg-white shadow-xl border-none"
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  transform: 'scale(0.6)',
                  transformOrigin: 'top center',
                }}
                sandbox="allow-same-origin"
                scrolling="no"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Apply Template
          </button>
        </div>
      </div>
    </div>
  );
};
