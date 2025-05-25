import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterWrapper from './FilterWrapper';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock ikon
jest.mock('../Utils/Icons', () => ({
  FilterListIcon: () => <div data-testid='filter-icon' />,
  SearchIcon: () => <div data-testid='search-icon' />,
}));

describe('<FilterWrapper />', () => {
  const handleFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<FilterWrapper handleFilterChange={handleFilterChange} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<FilterWrapper handleFilterChange={handleFilterChange} />);
    const input = screen.getByPlaceholderText(
      "Search by kontrahent's company name",
    );
    expect(input).toBeInTheDocument();
  });

  it('calls handleFilterChange function on input change', () => {
    render(<FilterWrapper handleFilterChange={handleFilterChange} />);
    const input = screen.getByPlaceholderText(
      "Search by kontrahent's company name",
    );
    fireEvent.change(input, { target: { value: 'example' } });
    expect(handleFilterChange).toHaveBeenCalledWith('example');
  });

  it('renders the filter button', () => {
    render(<FilterWrapper handleFilterChange={handleFilterChange} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('filter');
  });
});
