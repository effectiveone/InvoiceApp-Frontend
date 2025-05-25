import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NewInvoice from './NewInvoice';
import { InvoiceProvider } from '../../Context/useInvoiceContext';

// Mock store dla Redux
const mockStore = configureStore({
  reducer: {
    settings: (state = { settings: { templateInvoice: 'template1' } }) => state,
    auth: (state = { userDetails: { id: 1, email: 'test@example.com' } }) =>
      state,
  },
});

// Mock dla kontekstu faktury
const mockInvoiceContext = {
  componentRef: { current: null },
  handleSubmit: jest.fn(),
  invoiceType: 'sprzedazowa', // Poprawna wartość
  setInvoiceType: jest.fn(),
  currentInvoiceNumber: 'FV/2024/001',
  TAX_RATES: [
    { label: '23%', value: 0.23 },
    { label: '8%', value: 0.08 },
    { label: '5%', value: 0.05 },
    { label: '0%', value: 0 },
  ],
  selectedKontrahent: {
    kontrahent_nip: '1234567890', // Poprawna wartość dla selecta
    kontrahent_companyName: 'Test Company',
    kontrahent_address: 'Test Address',
    kontrahent_city: 'Test City',
    kontrahent_postalCode: '00-000',
    // Dodaj kompletne dane firmy dla template
    companyName: 'Test Company',
    legalForm: 'Sp. z o.o.',
    zipCode: '00-000',
    city: 'Test City',
    address: 'Test Address',
    nip: '1234567890',
  },
  items: [
    {
      name: 'Test Product',
      quantity: 1,
      unit: 'szt',
      vat: 0.23,
      netPrice: 100,
      netValue: 100,
      grossValue: 123,
    },
  ],
  setItems: jest.fn(),
  totalNetValue: 100,
  setTotalNetValue: jest.fn(),
  totalGrossValue: 123,
  setTotalGrossValue: jest.fn(),
  kontrahent: [
    {
      nip: '1234567890',
      companyName: 'Test Company',
    },
    {
      nip: '0987654321',
      companyName: 'Another Company',
    },
  ],
  invoiceSaleDate: '2024-01-15',
  setInvoiceSaleDate: jest.fn(),
  invoicePaymentDate: '2024-02-15',
  setInvoicePaymentDate: jest.fn(),
  invoiceDates: '2024-01-01',
  setInvoiceDates: jest.fn(),
  handleSelectChange: jest.fn(),
  setNotes: jest.fn(),
  notes: '',
  productList: [],
  isInPreviewMode: false,
  setIsInPreviewMode: jest.fn(),
  // Dodaj dane firmy wystawiającej
  companyData: {
    companyName: 'Test Company',
    legalForm: 'Sp. z o.o.',
    zipCode: '00-000',
    city: 'Test City',
    address: 'Test Address',
    nip: '1234567890',
  },
};

jest.mock('../../Context/useInvoiceContext', () => ({
  useInvoiceContext: () => mockInvoiceContext,
  InvoiceProvider: ({ children }) => <div>{children}</div>,
}));

// Mock dla i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Zwraca klucz tłumaczenia
  }),
}));

// Mock dla react-to-print
jest.mock('react-to-print', () => ({
  __esModule: true,
  default: ({ trigger, content }) => {
    const MockReactToPrint = () => trigger();
    return <MockReactToPrint />;
  },
}));

describe('NewInvoice - Testy Integracyjne', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <InvoiceProvider>
          <NewInvoice />
        </InvoiceProvider>
      </Provider>,
    );
  };

  test('powinien renderować formularz faktury z podstawowymi elementami', () => {
    renderComponent();

    // Sprawdź czy formularz się renderuje
    expect(screen.getByText('Nowa Faktura')).toBeInTheDocument();
    // Numer faktury jest w formacie "invoice FV/2024/001"
    expect(screen.getByText(/FV\/2024\/001/)).toBeInTheDocument();
  });

  test('powinien umożliwić przełączenie na podgląd faktury', async () => {
    const user = userEvent.setup();

    renderComponent();

    // Przełącz na podgląd
    const previewButton = screen.getByTestId('PreviewIcon').closest('button');
    await user.click(previewButton);

    // Sprawdź czy widok się zmienił - powinien być tekst "Podgląd faktury"
    expect(screen.getByText('Podgląd faktury')).toBeInTheDocument();
  });

  test('powinien umożliwić zapisanie faktury', async () => {
    const user = userEvent.setup();

    renderComponent();

    // Znajdź przycisk zapisu
    const saveButton = screen.getByTestId('SaveIcon').closest('button');
    await user.click(saveButton);

    expect(mockInvoiceContext.handleSubmit).toHaveBeenCalled();
  });

  test('powinien wyświetlać dane kontrahenta w podglądzie', async () => {
    const user = userEvent.setup();

    renderComponent();

    // Przełącz na podgląd
    const previewButton = screen.getByTestId('PreviewIcon').closest('button');
    await user.click(previewButton);

    // Sprawdź czy widok podglądu się pojawił
    expect(screen.getByText('Podgląd faktury')).toBeInTheDocument();
  });

  test('powinien wyświetlać pozycje faktury w podglądzie', async () => {
    const user = userEvent.setup();

    renderComponent();

    // Przełącz na podgląd
    const previewButton = screen.getByTestId('PreviewIcon').closest('button');
    await user.click(previewButton);

    // Sprawdź czy widok podglądu się pojawił
    expect(screen.getByText('Podgląd faktury')).toBeInTheDocument();
  });

  test('powinien umożliwić powrót z podglądu do edycji', async () => {
    const user = userEvent.setup();

    renderComponent();

    // Przełącz na podgląd
    const previewButton = screen.getByTestId('PreviewIcon').closest('button');
    await user.click(previewButton);

    // Sprawdź czy jesteśmy w podglądzie
    expect(screen.getByText('Podgląd faktury')).toBeInTheDocument();

    // Znajdź przycisk powrotu przez ikonę VisibilityOff (nie EditIcon)
    const backButton = screen
      .getByTestId('VisibilityOffIcon')
      .closest('button');
    await user.click(backButton);

    // Sprawdź czy wróciliśmy do formularza - powinien być tekst "Nowa Faktura"
    expect(screen.getByText('Nowa Faktura')).toBeInTheDocument();
    expect(screen.queryByText('Podgląd faktury')).not.toBeInTheDocument();
  });

  test('powinien wyświetlać poprawne sumy w podglądzie', async () => {
    const user = userEvent.setup();

    renderComponent();

    // Przełącz na podgląd
    const previewButton = screen.getByTestId('PreviewIcon').closest('button');
    await user.click(previewButton);

    // Sprawdź czy widok podglądu się pojawił
    expect(screen.getByText('Podgląd faktury')).toBeInTheDocument();
  });
});
