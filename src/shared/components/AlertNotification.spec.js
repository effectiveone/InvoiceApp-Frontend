import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import AlertNotification from './AlertNotification';

// Mock store dla Redux
const mockStore = configureStore({
  reducer: {
    alert: (
      state = {
        showAlertMessage: false,
        alertMessageContent: '',
        closeAlertMessage: jest.fn(),
      },
    ) => state,
  },
});

describe('AlertNotification', () => {
  it('should render Snackbar when showAlertMessage is true', () => {
    const storeWithAlert = configureStore({
      reducer: {
        alert: () => ({
          showAlertMessage: true,
          alertMessageContent: 'Test message',
          closeAlertMessage: jest.fn(),
        }),
      },
    });

    render(
      <Provider store={storeWithAlert}>
        <AlertNotification />
      </Provider>,
    );

    // Sprawdź czy alert jest widoczny
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should not render alert when showAlertMessage is false', () => {
    const storeWithoutAlert = configureStore({
      reducer: {
        alert: () => ({
          showAlertMessage: false,
          alertMessageContent: 'Test message',
          closeAlertMessage: jest.fn(),
        }),
      },
    });

    render(
      <Provider store={storeWithoutAlert}>
        <AlertNotification />
      </Provider>,
    );

    // Sprawdź czy alert nie jest widoczny
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });
});
