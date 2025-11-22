import { InvoiceData } from '@/types/invoice';
import { getTemplateStyles } from './template-styles';

export const generateInvoiceHTML = (data: InvoiceData): string => {
  const subtotal = data.lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxAmount = data.taxDetails ? (subtotal * data.taxDetails.rate) / 100 : 0;
  const total = subtotal + taxAmount;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice ${data.invoiceNumber || ''}</title>
      <style>
        ${getTemplateStyles(data.template)}
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="company-info">
            <h1>${data.company.name}</h1>
            ${data.fieldVisibility.companyEmail && data.company.email ? `<p>📧 ${data.company.email}</p>` : ''}
            ${data.fieldVisibility.companyPhone && data.company.phone ? `<p>📞 ${data.company.phone}</p>` : ''}
            ${data.fieldVisibility.companyAddress && data.company.address ? `<p>📍 ${data.company.address}</p>` : ''}
            ${data.fieldVisibility.companyWebsite && data.company.website ? `<p>🌐 ${data.company.website}</p>` : ''}
          </div>
          <div class="invoice-title">
            <h2>INVOICE</h2>
            <div class="invoice-meta">
              ${data.includeInvoiceNumber && data.invoiceNumber ? `<p><strong>Invoice #:</strong> ${data.invoiceNumber}</p>` : ''}
              <p><strong>Date:</strong> ${new Date(data.invoiceDate).toLocaleDateString()}</p>
              ${data.fieldVisibility.dueDate && data.dueDate ? `<p><strong>Due Date:</strong> ${new Date(data.dueDate).toLocaleDateString()}</p>` : ''}
            </div>
          </div>
        </div>

        <!-- Billing Information -->
        <div class="section">
          <div class="section-title">Bill To</div>
          <div class="billing-section">
            <div class="billing-column">
              <strong>${data.client.name}</strong>
              ${data.fieldVisibility.clientEmail && data.client.email ? `<p>${data.client.email}</p>` : ''}
              ${data.fieldVisibility.clientPhone && data.client.phone ? `<p>${data.client.phone}</p>` : ''}
              ${data.fieldVisibility.clientAddress && data.client.address ? `<p>${data.client.address}</p>` : ''}
            </div>
          </div>
        </div>

        <!-- Line Items Table -->
        <table>
          <thead>
            <tr>
              <th style="width: 50%;">Description</th>
              <th style="width: 15%;" class="text-right">Quantity</th>
              <th style="width: 15%;" class="text-right">Unit Price</th>
              <th style="width: 20%;" class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.lineItems
              .map(
                (item) => `
              <tr>
                <td>${item.description}</td>
                <td class="text-right">${item.quantity}</td>
                <td class="text-right">${formatCurrency(item.unitPrice)}</td>
                <td class="text-right">${formatCurrency(item.quantity * item.unitPrice)}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <!-- Totals -->
        <div class="totals">
          <div class="total-row">
            <div class="label">Subtotal:</div>
            <div class="value">${formatCurrency(subtotal)}</div>
          </div>
          ${
            data.includeTaxDetails && data.taxDetails
              ? `
            <div class="total-row">
              <div class="label">${data.taxDetails.taxName} (${data.taxDetails.rate}%):</div>
              <div class="value">${formatCurrency(taxAmount)}</div>
            </div>
          `
              : ''
          }
          <div class="total-row grand-total">
            <div class="label">Total:</div>
            <div class="value">${formatCurrency(total)}</div>
          </div>
        </div>

        <!-- Payment Information -->
        ${
          data.includeBankDetails && data.bankDetails
            ? `
          <div class="section">
            <div class="section-title">Payment Details</div>
            ${data.fieldVisibility.bankAccountName && data.bankDetails.accountName ? `<p><strong>Account Name:</strong> ${data.bankDetails.accountName}</p>` : ''}
            ${data.fieldVisibility.bankAccountNumber && data.bankDetails.accountNumber ? `<p><strong>Account Number:</strong> ${data.bankDetails.accountNumber}</p>` : ''}
            ${data.fieldVisibility.bankName && data.bankDetails.bankName ? `<p><strong>Bank Name:</strong> ${data.bankDetails.bankName}</p>` : ''}
            ${data.fieldVisibility.bankBSB && data.bankDetails.bsb ? `<p><strong>BSB:</strong> ${data.bankDetails.bsb}</p>` : ''}
            ${data.fieldVisibility.bankSwiftCode && data.bankDetails.swiftCode ? `<p><strong>SWIFT Code:</strong> ${data.bankDetails.swiftCode}</p>` : ''}
            ${data.fieldVisibility.bankIBAN && data.bankDetails.iban ? `<p><strong>IBAN:</strong> ${data.bankDetails.iban}</p>` : ''}
          </div>
        `
            : ''
        }

        <!-- Payment Terms and Notes -->
        ${
          data.includePaymentTerms && data.paymentTerms
            ? `<div class="notes"><strong>Payment Terms:</strong> ${data.paymentTerms}</div>`
            : ''
        }
        ${data.notes ? `<div class="notes"><strong>Notes:</strong> ${data.notes}</div>` : ''}

        <!-- Footer -->
        <div class="footer">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
