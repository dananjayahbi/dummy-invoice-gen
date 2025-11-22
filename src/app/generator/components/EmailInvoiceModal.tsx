'use client';

import React, { useState } from 'react';
import { X, Mail, Send } from 'lucide-react';
import emailTemplates from '@/data/email-templates.json';

interface EmailInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfBase64: string;
  companyName: string;
  clientName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
}

export const EmailInvoiceModal: React.FC<EmailInvoiceModalProps> = ({
  isOpen,
  onClose,
  pdfBase64,
  companyName,
  clientName,
  invoiceNumber,
  invoiceDate,
  dueDate,
  totalAmount,
}) => {
  const [recipientEmail, setRecipientEmail] = useState('bvsbusiness4@gmail.com');
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const isGeneratingPDF = !pdfBase64; // PDF is generating if pdfBase64 is empty

  const handleSend = async () => {
    setSending(true);
    setStatus(null);

    try {
      // Get selected email template
      const template = emailTemplates.find((t) => t.id === selectedTemplate) || emailTemplates[0];

      // Replace placeholders in subject and body
      const subject = template.subject
        .replace('{invoiceNumber}', invoiceNumber)
        .replace('{companyName}', companyName);

      const body = template.body
        .replace(/{companyName}/g, companyName)
        .replace(/{clientName}/g, clientName)
        .replace(/{invoiceNumber}/g, invoiceNumber)
        .replace(/{invoiceDate}/g, invoiceDate)
        .replace(/{dueDate}/g, dueDate)
        .replace(/{totalAmount}/g, totalAmount.toFixed(2));

      // Send email via API route
      const response = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail,
          pdfBase64,
          subject,
          body,
          companyName,
          invoiceNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Email sent successfully!' });
        setTimeout(() => {
          onClose();
          setStatus(null);
        }, 2000);
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send email' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Email Invoice</h2>
              <p className="text-sm text-gray-600">Send invoice #{invoiceNumber} via email</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Recipient Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Template */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {emailTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              {emailTemplates.find((t) => t.id === selectedTemplate)?.subject.replace('{invoiceNumber}', invoiceNumber).replace('{companyName}', companyName)}
            </p>
          </div>

          {/* Status Message */}
          {status && (
            <div
              className={`p-4 rounded-lg ${
                status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {status.message}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            disabled={sending}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || !recipientEmail}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
