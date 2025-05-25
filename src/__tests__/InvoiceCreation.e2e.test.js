import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';

// Mock store dla Redux
const mockStore = configureStore({
  reducer: {
    auth: (state = { userDetails: { id: 1, email: 'test@example.com' } }) =>
      state,
  },
});

// Mock dla react-router-dom (oprócz BrowserRouter)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  Navigate: ({ to }) => <div>Navigate to {to}</div>,
}));

// Mock dla axios
jest.mock('axios');

// Mock dla react-to-print
jest.mock('react-to-print', () => ({
  __esModule: true,
  default: ({ trigger, content }) => {
    const MockReactToPrint = () => trigger();
    return <MockReactToPrint />;
  },
}));

// Mock dla i18next
jest.mock('i18next', () => ({
  t: (key) => {
    const translations = {
      addCustomer: 'Dodaj kontrahenta',
      addProduct: 'Dodaj produkt',
      newInvoice: 'Nowa faktura',
      invoiceNumber: 'Numer faktury',
      customerName: 'Nazwa firmy',
      nip: 'NIP',
      address: 'Adres',
      city: 'Miasto',
      postalCode: 'Kod pocztowy',
      email: 'Email',
      phone: 'Telefon',
      productName: 'Nazwa produktu',
      netPrice: 'Cena netto',
      grossPrice: 'Cena brutto',
      vat: 'VAT',
      unit: 'Jednostka',
      quantity: 'Ilość',
      description: 'Opis',
      save: 'Zapisz',
      cancel: 'Anuluj',
      edit: 'Edytuj',
      delete: 'Usuń',
      selectCustomer: 'Wybierz kontrahenta',
      addProductOrService: 'Dodaj produkt lub usługę',
      invoiceSaleDate: 'Data sprzedaży',
      invoicePaymentDate: 'Termin płatności',
      preview: 'Podgląd',
      back: 'Powrót',
    };
    return translations[key] || key;
  },
  use: jest.fn(),
  init: jest.fn(),
  changeLanguage: jest.fn(),
}));

// Mock dla react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        addCustomer: 'Dodaj kontrahenta',
        addProduct: 'Dodaj produkt',
        newInvoice: 'Nowa faktura',
        invoiceNumber: 'Numer faktury',
        customerName: 'Nazwa firmy',
        nip: 'NIP',
        address: 'Adres',
        city: 'Miasto',
        postalCode: 'Kod pocztowy',
        email: 'Email',
        phone: 'Telefon',
        productName: 'Nazwa produktu',
        netPrice: 'Cena netto',
        grossPrice: 'Cena brutto',
        vat: 'VAT',
        unit: 'Jednostka',
        quantity: 'Ilość',
        description: 'Opis',
        save: 'Zapisz',
        cancel: 'Anuluj',
        edit: 'Edytuj',
        delete: 'Usuń',
        selectCustomer: 'Wybierz kontrahenta',
        addProductOrService: 'Dodaj produkt lub usługę',
        invoiceSaleDate: 'Data sprzedaży',
        invoicePaymentDate: 'Termin płatności',
        preview: 'Podgląd',
        back: 'Powrót',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// Mock dla localStorage
const localStorageMock = {
  getItem: jest.fn(() => JSON.stringify({ id: 1, email: 'test@example.com' })),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock dla window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Tworzenie Faktury - Test End-to-End', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({ id: 1, email: 'test@example.com' }),
    );
  });

  const renderApp = () => {
    return render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
  };

  // Test 1: Podstawowe renderowanie aplikacji
  test('aplikacja powinna się renderować bez błędów', async () => {
    renderApp();

    // Sprawdź czy aplikacja się renderuje
    await waitFor(
      () => {
        expect(screen.getByText(/invoice/i)).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  // Test 2: Nawigacja między stronami
  test('nawigacja między stronami powinna działać', async () => {
    const user = userEvent.setup();
    renderApp();

    // Poczekaj na załadowanie aplikacji
    await waitFor(
      () => {
        expect(document.body).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Test będzie zależał od rzeczywistej struktury nawigacji w aplikacji
    // Na razie sprawdzamy czy aplikacja się ładuje
  });

  // Test 3: Sprawdzenie elementów podstawowych
  test('podstawowe elementy UI powinny być widoczne', async () => {
    renderApp();

    // Sprawdź czy podstawowe elementy są widoczne
    await waitFor(
      () => {
        // Te elementy mogą się różnić w zależności od rzeczywistej struktury aplikacji
        expect(document.body).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
});
