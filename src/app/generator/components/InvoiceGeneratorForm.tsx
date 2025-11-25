'use client';

import React, { useState, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';
import { InvoiceData, InvoiceLineItem, InvoiceTemplate } from '@/types/invoice';
import { generateInvoiceHTML } from '@/lib/utils/invoice-generator';
import { generateRandomInvoiceData } from '@/lib/utils/random-invoice-generator';

interface InvoiceGeneratorFormProps {
  onPreview: (html: string, companyName: string, invoiceData: InvoiceData, summaryData: {
    companyName: string;
    clientName: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    totalAmount: number;
  }) => void;
  template: InvoiceTemplate;
}

export interface InvoiceGeneratorFormRef {
  generateRandomData: () => void;
  triggerPreview: () => void;
}

export const InvoiceGeneratorForm = forwardRef<InvoiceGeneratorFormRef, InvoiceGeneratorFormProps>(
  ({ onPreview, template }, ref) => {
  console.log('InvoiceGeneratorForm rendered with template:', template);
  const [companyName, setCompanyName] = useState('Your Company');
  const [companyEmail, setCompanyEmail] = useState('contact@company.com');
  const [companyPhone, setCompanyPhone] = useState('+1 (555) 123-4567');
  const [companyAddress, setCompanyAddress] = useState('123 Business St, City, State 12345');
  const [companyWebsite, setCompanyWebsite] = useState('www.company.com');

  const [clientName, setClientName] = useState('Client Name');
  const [clientEmail, setClientEmail] = useState('client@example.com');
  const [clientAddress, setClientAddress] = useState('456 Client Ave, Town, State 67890');
  const [clientPhone, setClientPhone] = useState('+1 (555) 987-6543');

  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');

  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    { description: 'Professional Services', quantity: 1, unitPrice: 1000 },
    { description: 'Consulting Fees', quantity: 5, unitPrice: 200 },
  ]);

  const [taxName, setTaxName] = useState('GST');
  const [taxRate, setTaxRate] = useState(10);
  const [bankAccountName, setBankAccountName] = useState('Company Inc.');
  const [bankAccountNumber, setBankAccountNumber] = useState('1234567890');
  const [bankName, setBankName] = useState('Sample Bank');
  const [bankBSB, setBankBSB] = useState('123456');
  const [bankSwiftCode, setBankSwiftCode] = useState('');
  const [bankIBAN, setBankIBAN] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Payment due within 30 days');
  const [notes, setNotes] = useState('Thank you for your business!');

  // Toggle fields
  const [includeInvoiceNumber, setIncludeInvoiceNumber] = useState(true);
  const [includeBankDetails, setIncludeBankDetails] = useState(true);
  const [includeTaxDetails, setIncludeTaxDetails] = useState(true);
  const [includePaymentTerms, setIncludePaymentTerms] = useState(true);

  // Field visibility toggles
  const [showCompanyEmail, setShowCompanyEmail] = useState(true);
  const [showCompanyPhone, setShowCompanyPhone] = useState(true);
  const [showCompanyAddress, setShowCompanyAddress] = useState(true);
  const [showCompanyWebsite, setShowCompanyWebsite] = useState(true);
  const [showClientEmail, setShowClientEmail] = useState(true);
  const [showClientPhone, setShowClientPhone] = useState(true);
  const [showClientAddress, setShowClientAddress] = useState(true);
  const [showDueDate, setShowDueDate] = useState(true);
  const [showBankAccountName, setShowBankAccountName] = useState(true);
  const [showBankAccountNumber, setShowBankAccountNumber] = useState(true);
  const [showBankName, setShowBankName] = useState(true);
  const [showBankBSB, setShowBankBSB] = useState(true);
  const [showBankSwiftCode, setShowBankSwiftCode] = useState(false);
  const [showBankIBAN, setShowBankIBAN] = useState(false);

  const handleLineItemChange = (index: number, field: keyof InvoiceLineItem, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const handleGenerateRandomData = useCallback(() => {
    const randomData = generateRandomInvoiceData();

    setCompanyName(randomData.company.name);
    setCompanyEmail(randomData.company.email);
    setCompanyPhone(randomData.company.phone || '');
    setCompanyAddress(randomData.company.address || '');
    setCompanyWebsite(randomData.company.website || '');

    setClientName(randomData.client.name);
    setClientEmail(randomData.client.email || '');
    setClientPhone(randomData.client.phone || '');
    setClientAddress(randomData.client.address || '');

    setInvoiceNumber(randomData.invoiceNumber);
    setInvoiceDate(randomData.invoiceDate);
    setDueDate(randomData.dueDate);

    setLineItems(randomData.lineItems);

    setTaxName(randomData.taxName);
    setTaxRate(randomData.taxRate);

    setBankAccountName(randomData.bankDetails.accountName);
    setBankAccountNumber(randomData.bankDetails.accountNumber);
    setBankName(randomData.bankDetails.bankName);
    setBankBSB(randomData.bankDetails.bsb || '');
    setBankSwiftCode(randomData.bankDetails.swiftCode || '');
    setBankIBAN('');

    setPaymentTerms(randomData.paymentTerms);
    setNotes(randomData.notes);
  }, []);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    generateRandomData: handleGenerateRandomData,
    triggerPreview: handlePreview,
  }));

  // Auto-generate random data on initial page load
  useEffect(() => {
    handleGenerateRandomData();
  }, [handleGenerateRandomData]);

  const addLineItem = () => {
    setLineItems([...lineItems, { description: 'Item', quantity: 1, unitPrice: 0 }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handlePreview = useCallback(() => {
    const invoiceData: InvoiceData = {
      template,
      invoiceNumber,
      invoiceDate,
      dueDate: dueDate || undefined,
      company: {
        name: companyName,
        email: companyEmail,
        phone: companyPhone,
        address: companyAddress,
        website: companyWebsite,
      },
      client: {
        name: clientName,
        email: clientEmail,
        address: clientAddress,
        phone: clientPhone,
      },
      lineItems,
      taxDetails: includeTaxDetails ? { taxName, rate: taxRate } : undefined,
      bankDetails: includeBankDetails
        ? { accountName: bankAccountName, accountNumber: bankAccountNumber, bankName, bsb: bankBSB, swiftCode: bankSwiftCode, iban: bankIBAN }
        : undefined,
      paymentTerms: includePaymentTerms ? paymentTerms : undefined,
      notes,
      includeInvoiceNumber,
      includeBankDetails,
      includeTaxDetails,
      includePaymentTerms,
      fieldVisibility: {
        companyEmail: showCompanyEmail,
        companyPhone: showCompanyPhone,
        companyAddress: showCompanyAddress,
        companyWebsite: showCompanyWebsite,
        clientEmail: showClientEmail,
        clientPhone: showClientPhone,
        clientAddress: showClientAddress,
        dueDate: showDueDate,
        bankAccountName: showBankAccountName,
        bankAccountNumber: showBankAccountNumber,
        bankName: showBankName,
        bankBSB: showBankBSB,
        bankSwiftCode: showBankSwiftCode,
        bankIBAN: showBankIBAN,
      },
    };

    const html = generateInvoiceHTML(invoiceData);
    
    // Calculate total amount
    const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxAmount = includeTaxDetails ? (subtotal * taxRate) / 100 : 0;
    const totalAmount = subtotal + taxAmount;
    
    onPreview(html, companyName, invoiceData, {
      companyName,
      clientName,
      invoiceNumber,
      invoiceDate,
      dueDate: dueDate || '',
      totalAmount,
    });
  }, [
    template,
    invoiceNumber,
    invoiceDate,
    dueDate,
    companyName,
    companyEmail,
    companyPhone,
    companyAddress,
    companyWebsite,
    clientName,
    clientEmail,
    clientAddress,
    clientPhone,
    lineItems,
    taxName,
    taxRate,
    bankAccountName,
    bankAccountNumber,
    bankName,
    bankBSB,
    bankSwiftCode,
    bankIBAN,
    paymentTerms,
    notes,
    includeInvoiceNumber,
    includeBankDetails,
    includeTaxDetails,
    includePaymentTerms,
    showCompanyEmail,
    showCompanyPhone,
    showCompanyAddress,
    showCompanyWebsite,
    showClientEmail,
    showClientPhone,
    showClientAddress,
    showDueDate,
    showBankAccountName,
    showBankAccountNumber,
    showBankName,
    showBankBSB,
    showBankSwiftCode,
    showBankIBAN,
  ]);

  // Auto-update preview whenever form data changes
  useEffect(() => {
    console.log('Auto-preview useEffect triggered, template:', template);
    handlePreview();
  }, [handlePreview]);

  // Watch for template prop changes and trigger preview
  useEffect(() => {
    console.log('Template prop changed to:', template);
    handlePreview();
  }, [template, handlePreview]);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Company Information */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Company Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="col-span-2">
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showCompanyEmail}
                onChange={(e) => setShowCompanyEmail(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              disabled={!showCompanyEmail}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showCompanyPhone}
                onChange={(e) => setShowCompanyPhone(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Phone</span>
            </label>
            <input
              type="text"
              placeholder="Phone"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              disabled={!showCompanyPhone}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 w-full"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showCompanyWebsite}
                onChange={(e) => setShowCompanyWebsite(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Website</span>
            </label>
            <input
              type="text"
              placeholder="Website"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              disabled={!showCompanyWebsite}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showCompanyAddress}
                onChange={(e) => setShowCompanyAddress(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              disabled={!showCompanyAddress}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Client Information */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Client Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showClientEmail}
                onChange={(e) => setShowClientEmail(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              disabled={!showClientEmail}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 w-full"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showClientPhone}
                onChange={(e) => setShowClientPhone(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Phone</span>
            </label>
            <input
              type="text"
              placeholder="Phone"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              disabled={!showClientPhone}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showClientAddress}
                onChange={(e) => setShowClientAddress(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              disabled={!showClientAddress}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Invoice Details */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Invoice Details</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={includeInvoiceNumber}
                onChange={(e) => setIncludeInvoiceNumber(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Invoice Number</span>
            </label>
            <input
              type="text"
              placeholder="Invoice #"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              disabled={!includeInvoiceNumber}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Invoice Date *</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showDueDate}
                onChange={(e) => setShowDueDate(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Due Date</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={!showDueDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Line Items */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Line Items</h2>
        <div className="space-y-4">
          {lineItems.map((item, index) => (
            <div key={index} className="flex gap-4 items-end">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => handleLineItemChange(index, 'quantity', parseFloat(e.target.value))}
                className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) => handleLineItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
              <button
                onClick={() => removeLineItem(index)}
                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addLineItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            + Add Line Item
          </button>
        </div>
      </section>

      {/* Tax Configuration */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={includeTaxDetails}
            onChange={(e) => setIncludeTaxDetails(e.target.checked)}
            className="rounded"
          />
          <span className="text-lg font-semibold text-gray-800">Include Tax</span>
        </label>
        {includeTaxDetails && (
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tax Name (e.g., GST, VAT)"
              value={taxName}
              onChange={(e) => setTaxName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Tax Rate (%)"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        )}
      </section>

      {/* Bank Details */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={includeBankDetails}
            onChange={(e) => setIncludeBankDetails(e.target.checked)}
            className="rounded"
          />
          <span className="text-lg font-semibold text-gray-800">Include Bank Details</span>
        </label>
        {includeBankDetails && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={showBankAccountName}
                  onChange={(e) => setShowBankAccountName(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Show Account Name</span>
              </label>
              <input
                type="text"
                placeholder="Account Name"
                value={bankAccountName}
                onChange={(e) => setBankAccountName(e.target.value)}
                disabled={!showBankAccountName}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={showBankAccountNumber}
                  onChange={(e) => setShowBankAccountNumber(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Show Account Number</span>
              </label>
              <input
                type="text"
                placeholder="Account Number"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                disabled={!showBankAccountNumber}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 w-full"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={showBankName}
                  onChange={(e) => setShowBankName(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Show Bank Name</span>
              </label>
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                disabled={!showBankName}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 w-full"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={showBankBSB}
                  onChange={(e) => setShowBankBSB(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Show BSB</span>
              </label>
              <input
                type="text"
                placeholder="BSB"
                value={bankBSB}
                onChange={(e) => setBankBSB(e.target.value)}
                disabled={!showBankBSB}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 w-full"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={showBankSwiftCode}
                  onChange={(e) => setShowBankSwiftCode(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Show SWIFT Code</span>
              </label>
              <input
                type="text"
                placeholder="SWIFT Code"
                value={bankSwiftCode}
                onChange={(e) => setBankSwiftCode(e.target.value)}
                disabled={!showBankSwiftCode}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 w-full"
              />
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={showBankIBAN}
                  onChange={(e) => setShowBankIBAN(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Show IBAN</span>
              </label>
              <input
                type="text"
                placeholder="IBAN"
                value={bankIBAN}
                onChange={(e) => setBankIBAN(e.target.value)}
                disabled={!showBankIBAN}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        )}
      </section>

      {/* Additional Settings */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={includePaymentTerms}
            onChange={(e) => setIncludePaymentTerms(e.target.checked)}
            className="rounded"
          />
          <span className="text-lg font-semibold text-gray-800">Include Payment Terms</span>
        </label>
        {includePaymentTerms && (
          <textarea
            placeholder="Payment terms..."
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
          />
        )}

        <label className="block text-lg font-semibold text-gray-800 mt-6 mb-2">Additional Notes</label>
        <textarea
          placeholder="Add any additional notes to the invoice..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
        />
      </section>
    </div>
  );
});

InvoiceGeneratorForm.displayName = 'InvoiceGeneratorForm';

