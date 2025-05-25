import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomPrimaryButton from './CustomPrimaryButton';

describe('CustomPrimaryButton', () => {
  const props = {
    label: 'Submit',
    additionalStyles: {
      marginTop: '20px',
    },
    disabled: false,
    onClick: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    render(<CustomPrimaryButton {...props} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render a Button component with the correct label', () => {
    render(<CustomPrimaryButton {...props} />);
    expect(
      screen.getByRole('button', { name: props.label }),
    ).toBeInTheDocument();
  });

  it('should render a disabled Button component if disabled prop is true', () => {
    render(<CustomPrimaryButton {...props} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render a Button component with additional styles if additionalStyles prop is provided', () => {
    render(<CustomPrimaryButton {...props} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('margin-top: 20px');
  });

  it('should call onClick function when button is clicked', () => {
    render(<CustomPrimaryButton {...props} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
