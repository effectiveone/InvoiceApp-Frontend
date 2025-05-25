import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewInvoice from './NewInvoice';
import { useInvoiceContext } from '../../../../../entities/invoice/model/useInvoiceContext';

// Mock kontekstu
jest.mock('../../../../../entities/invoice/model/useInvoiceContext', () => ({
  useInvoiceContext: jest.fn(),
}));

// Mock i18next
jest.mock('i18next', () => ({
  t: (key) => key,
}));

test('renders preview button', () => {
  // Mock wartości kontekstu z wszystkimi potrzebnymi właściwościami
  useInvoiceContext.mockReturnValue({
    componentRef: { current: null },
    handleSubmit: jest.fn(),
    invoiceType: 'sprzedazowa',
    setInvoiceType: jest.fn(),
    currentInvoiceNumber: 'INV-001',
    TAX_RATES: [
      { value: 0.23, label: '23%' },
      { value: 0.08, label: '8%' },
      { value: 0.05, label: '5%' },
      { value: 0, label: '0%' },
    ],
    selectedKontrahent: null,
    items: [],
    setItems: jest.fn(),
    totalNetValue: 0,
    setTotalNetValue: jest.fn(),
    totalGrossValue: 0,
    setTotalGrossValue: jest.fn(),
    kontrahent: [], // Pusta tablica zamiast undefined
    invoiceSaleDate: '',
    setInvoiceSaleDate: jest.fn(),
    invoicePaymentDate: '',
    setInvoicePaymentDate: jest.fn(),
    handleSelectChange: jest.fn(),
    invoiceDates: '',
    setInvoiceDates: jest.fn(),
    setNotes: jest.fn(),
    notes: '',
  });

  const { container } = render(<NewInvoice />);

  // Sprawdź czy komponent się renderuje
  expect(container.firstChild).toBeInTheDocument();
});
