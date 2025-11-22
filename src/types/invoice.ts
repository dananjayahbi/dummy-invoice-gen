// Invoice data types and interfaces

export type InvoiceTemplate = 
  | 'professional' 
  | 'modern' 
  | 'classic' 
  | 'minimal' 
  | 'bold' 
  | 'elegant' 
  | 'corporate' 
  | 'creative' 
  | 'simple' 
  | 'tech'
  | 'luxury'
  | 'startup'
  | 'retro'
  | 'neon'
  | 'pastel'
  | 'ocean'
  | 'forest'
  | 'sunset'
  | 'midnight'
  | 'candy'
  | 'industrial'
  | 'vintage'
  | 'futuristic'
  | 'minimalist-pro'
  | 'colorful'
  | 'monochrome'
  | 'gradient'
  | 'geometric'
  | 'organic'
  | 'swiss';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total?: number;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bsb?: string;
  swiftCode?: string;
  iban?: string;
}

export interface CompanyInfo {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  logo?: string;
}

export interface ClientInfo {
  name: string;
  email?: string;
  address?: string;
  phone?: string;
}

export interface FieldVisibility {
  companyEmail: boolean;
  companyPhone: boolean;
  companyAddress: boolean;
  companyWebsite: boolean;
  clientEmail: boolean;
  clientPhone: boolean;
  clientAddress: boolean;
  dueDate: boolean;
  bankAccountName: boolean;
  bankAccountNumber: boolean;
  bankName: boolean;
  bankBSB: boolean;
  bankSwiftCode: boolean;
  bankIBAN: boolean;
}

export interface TaxDetails {
  taxName: string; // e.g., GST, VAT
  rate: number; // e.g., 10 for 10%
}

export interface InvoiceData {
  template: InvoiceTemplate;
  invoiceNumber?: string;
  invoiceDate: string;
  dueDate?: string;
  company: CompanyInfo;
  client: ClientInfo;
  lineItems: InvoiceLineItem[];
  taxDetails?: TaxDetails;
  bankDetails?: BankDetails;
  notes?: string;
  paymentTerms?: string;
  includeInvoiceNumber: boolean;
  includeBankDetails: boolean;
  includeTaxDetails: boolean;
  includePaymentTerms: boolean;
  fieldVisibility: FieldVisibility;
}

export interface InvoiceFormState extends Omit<InvoiceData, 'lineItems'> {
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
}
