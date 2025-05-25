import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCompanyContext } from '../../Context/useCompanyContext';
import { CompanyContent } from './CompanyContent';

// Mock kontekstu
jest.mock('../../Context/useCompanyContext', () => ({
  useCompanyContext: jest.fn(),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock CompanyForm
jest.mock('./companyForm', () => {
  return function MockCompanyForm(props) {
    return <div data-testid='company-form'>Mock Company Form</div>;
  };
});

describe('CompanyContent component', () => {
  beforeEach(() => {
    useCompanyContext.mockReturnValue({
      updatedCompanyData: {
        name: 'Test Company',
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        zip: '12345',
      },
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
    });
  });

  it('renders company form', () => {
    render(<CompanyContent />);
    const companyForm = screen.getByTestId('company-form');
    expect(companyForm).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<CompanyContent />);
    const submitButton = screen.getByText('submit');
    expect(submitButton).toBeInTheDocument();
  });

  it('calls handleSubmit function when submit button is clicked', () => {
    const mockHandleSubmit = jest.fn();
    useCompanyContext.mockReturnValue({
      updatedCompanyData: {},
      handleChange: jest.fn(),
      handleSubmit: mockHandleSubmit,
    });

    render(<CompanyContent />);
    const submitButton = screen.getByText('submit');
    fireEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
