import React from 'react';
import { render } from '@testing-library/react';
import AuthBox from './AuthBox';
import '@testing-library/jest-dom';

describe('AuthBox', () => {
  it('should render children', () => {
    const { getByText } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByText('Child Component')).toBeInTheDocument();
  });

  it('should render with proper structure', () => {
    const { container } = render(<AuthBox>Test Content</AuthBox>);

    // Sprawdź czy komponent się renderuje
    expect(container.firstChild).toBeInTheDocument();

    // Sprawdź czy zawiera tekst
    expect(container).toHaveTextContent('Test Content');
  });

  it('should have a Paper component as child', () => {
    const { container } = render(<AuthBox>Test Content</AuthBox>);

    // Sprawdź czy zawiera element Paper (MUI Paper ma klasę MuiPaper-root)
    const paperElement = container.querySelector('.MuiPaper-root');
    expect(paperElement).toBeInTheDocument();
  });

  it('should render children inside Paper component', () => {
    const { getByText } = render(
      <AuthBox>
        <div>Test Child Component</div>
      </AuthBox>,
    );

    expect(getByText('Test Child Component')).toBeInTheDocument();
  });
});
