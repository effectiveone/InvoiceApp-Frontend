import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoicesIssuedList from './InvoicesIssuedList';

// Import mocków
import { useInvoiceContext } from '../../../entities/invoice/model/useInvoiceContext';
import useModal from '../../../../shared/lib/useModal';
import useInvoiceTable from '../../../../shared/lib/useInvoiceTable';

// Mock wszystkich potrzebnych hooków
jest.mock('../../../entities/invoice/model/useInvoiceContext', () => ({
  useInvoiceContext: jest.fn(),
}));

jest.mock('../../../../shared/lib/useModal', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../../shared/lib/useInvoiceTable', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('InvoicesIssuedList component', () => {
  beforeEach(() => {
    // Mock useInvoiceContext
    useInvoiceContext.mockReturnValue({
      invoiceDate: '2023-01-01',
      handleEditInvoice: jest.fn(),
      setLocalInvoiceNumber: jest.fn(),
    });

    // Mock useModal
    useModal.mockReturnValue({
      open: false,
      handleOpen: jest.fn(),
      handleClose: jest.fn(),
    });

    // Mock useInvoiceTable
    useInvoiceTable.mockReturnValue({
      order: 'asc',
      orderBy: 'invoiceNumber',
      handleRequestSort: jest.fn(),
      sortedData: [],
      invoices: [],
      filteredInvoices: [],
    });
  });

  test("renders 'Numer faktury' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Numer faktury');
    expect(column).toBeInTheDocument();
  });

  test("renders 'Data wystawienia' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Data wystawienia');
    expect(column).toBeInTheDocument();
  });

  test("renders 'Kontrahent' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Kontrahent');
    expect(column).toBeInTheDocument();
  });

  test("renders 'Kwota netto' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Kwota netto');
    expect(column).toBeInTheDocument();
  });

  test("renders 'Kwota brutto' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Kwota brutto');
    expect(column).toBeInTheDocument();
  });

  test('renders the component without crashing', () => {
    const { container } = render(<InvoicesIssuedList />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("can sort table by 'Numer faktury' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Numer faktury');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'descending');
  });

  test("can sort table by 'Data wystawienia' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Data wystawienia');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'descending');
  });

  test("can sort table by 'Kontrahent' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Kontrahent');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'descending');
  });

  test("can sort table by 'Kwota netto' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Kwota netto');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'descending');
  });

  test("can sort table by 'Kwota brutto' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText('Kwota brutto');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(column);
    expect(column).toHaveAttribute('aria-sort', 'descending');
  });
});
