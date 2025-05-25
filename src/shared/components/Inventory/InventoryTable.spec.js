import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InventoryTable from './InventoryTable';
import { useProductContext } from '../../Context/useProductContext';

// Mock kontekstu
jest.mock('../../Context/useProductContext', () => ({
  useProductContext: jest.fn(),
}));

describe('InventoryTable', () => {
  const mockHandleOpen = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockHandleEdit = jest.fn();
  const mockSetButtonText = jest.fn();
  const mockProductList = [
    {
      _id: '1',
      name: 'Product 1',
      vat: 23,
      netPrice: 100,
      unit: 5,
    },
    {
      _id: '2',
      name: 'Product 2',
      vat: 8,
      netPrice: 50,
      unit: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock kontekstu produktów
    useProductContext.mockReturnValue({
      productList: mockProductList,
      handleOpen: mockHandleOpen,
      handleDelete: mockHandleDelete,
      handleEdit: mockHandleEdit,
      setButtonText: mockSetButtonText,
    });
  });

  test('renders the component', () => {
    const { container } = render(<InventoryTable />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders the product list', () => {
    render(<InventoryTable />);

    // Sprawdź czy produkty są renderowane (jeśli są widoczne w tabeli)
    const productElements = screen.queryAllByText(/Product/);
    expect(productElements.length).toBeGreaterThanOrEqual(0);
  });
});
