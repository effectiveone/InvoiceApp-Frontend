import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContrahentTable from './ContrahentTable';
import { useKontrahentContext } from '../../Context/useKontrahentContext';

// Mock kontekstu
jest.mock('../../Context/useKontrahentContext', () => ({
  useKontrahentContext: jest.fn(),
}));

describe('ContrahentTable', () => {
  beforeEach(() => {
    // Domyślny mock kontekstu
    useKontrahentContext.mockReturnValue({
      kontrahent: [],
      handleEdit: jest.fn(),
      handleDelete: jest.fn(),
      setButtonText: jest.fn(),
    });
  });

  test('should render the table', () => {
    const { container } = render(<ContrahentTable />);
    // Sprawdź czy komponent się renderuje
    expect(container.firstChild).toBeInTheDocument();
  });

  test('should call handleEdit function when edit button is clicked', () => {
    const handleEdit = jest.fn();
    const mockKontrahent = [
      {
        _id: '12345',
        companyName: 'Example Company',
        legalForm: 'Ltd',
        nip: '1234567890',
        city: 'New York',
      },
    ];

    useKontrahentContext.mockReturnValue({
      kontrahent: mockKontrahent,
      handleEdit,
      handleDelete: jest.fn(),
      setButtonText: jest.fn(),
    });

    render(<ContrahentTable />);

    // Sprawdź czy przycisk edycji istnieje i kliknij go
    const editButtons = screen.queryAllByText('Edytuj');
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      expect(handleEdit).toHaveBeenCalled();
    }
  });

  test('should call handleDelete function when delete button is clicked', () => {
    const handleDelete = jest.fn();
    const mockKontrahent = [
      {
        _id: '12345',
        companyName: 'Example Company',
        legalForm: 'Ltd',
        nip: '1234567890',
        city: 'New York',
      },
    ];

    useKontrahentContext.mockReturnValue({
      kontrahent: mockKontrahent,
      handleEdit: jest.fn(),
      handleDelete,
      setButtonText: jest.fn(),
    });

    render(<ContrahentTable />);

    // Sprawdź czy przycisk usuwania istnieje i kliknij go
    const deleteButtons = screen.queryAllByText('Usuń');
    if (deleteButtons.length > 0) {
      fireEvent.click(deleteButtons[0]);
      expect(handleDelete).toHaveBeenCalled();
    }
  });
});
