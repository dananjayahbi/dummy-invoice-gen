import companies from '@/data/companies.json';
import clients from '@/data/clients.json';
import services from '@/data/services.json';
import banks from '@/data/banks.json';
import invoiceNumbers from '@/data/invoice-numbers.json';
import paymentTerms from '@/data/payment-terms.json';
import notes from '@/data/notes.json';

// Helper function to get random item from array
const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get random number in range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate random date
const getRandomDate = (daysOffset: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};

interface GeneratedLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

// Generate random line items
const generateLineItems = (count: number = 3): GeneratedLineItem[] => {
  const items: GeneratedLineItem[] = [];
  const itemCount = count || getRandomNumber(1, 5);

  for (let i = 0; i < itemCount; i++) {
    items.push({
      description: getRandomItem(services),
      quantity: getRandomNumber(1, 10),
      unitPrice: getRandomNumber(50, 2000),
    });
  }

  return items;
};

// Main function to generate random invoice data
export const generateRandomInvoiceData = () => {
  const company = getRandomItem(companies);
  const client = getRandomItem(clients);
  const bank = getRandomItem(banks);
  const invoiceNumber = getRandomItem(invoiceNumbers);
  const paymentTerm = getRandomItem(paymentTerms);
  const note = getRandomItem(notes);

  return {
    company,
    client,
    invoiceNumber,
    invoiceDate: getRandomDate(),
    dueDate: getRandomDate(30),
    lineItems: generateLineItems(),
    bankDetails: bank,
    paymentTerms: paymentTerm,
    notes: note,
    taxName: getRandomItem(['GST', 'VAT', 'Sales Tax', 'HST', 'PST']),
    taxRate: getRandomNumber(5, 15),
  };
};
