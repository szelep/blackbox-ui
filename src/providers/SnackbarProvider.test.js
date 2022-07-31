import {
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  SnackbarProvider,
  useSnackbar,
} from './SnackbarProvider';

beforeEach(() => {
  jest.useFakeTimers();
});

function TestComponent() {
  const {
    success, error,
  } = useSnackbar();

  return [
    <button
      key="1"
      data-testid="error-button"
      type="button"
      onClick={() => error('Error message')}
    >
      Click
    </button>,
    <button
      key="2"
      data-testid="success-button"
      type="button"
      onClick={() => success('Success message')}
    >
      Click
    </button>,
  ];
}

it('should not contain message without click', () => {
  render(
    <SnackbarProvider>
      <TestComponent />
    </SnackbarProvider>
  );

  expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  expect(screen.queryByText('Success message')).not.toBeInTheDocument();
});

it('should display success message', async () => {
  render(
    <SnackbarProvider>
      <TestComponent />
    </SnackbarProvider>
  );

  userEvent.click(screen.getByTestId('success-button'));

  await waitFor(() => {
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });
  expect(screen.queryByText('Error message')).not.toBeInTheDocument();
});

it('should display error message', async () => {
  render(
    <SnackbarProvider>
      <TestComponent />
    </SnackbarProvider>
  );

  userEvent.click(screen.getByTestId('error-button'));

  await waitFor(() => {
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
  expect(screen.queryByText('Success message')).not.toBeInTheDocument();
});

it('should message vanish after some time', async () => {
  render(
    <SnackbarProvider>
      <TestComponent />
    </SnackbarProvider>
  );

  userEvent.click(screen.getByTestId('error-button'));
  await waitFor(() => {
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
  await act(() => {
    jest.advanceTimersByTime(10000);
  });

  expect(screen.queryByText('Error message')).not.toBeInTheDocument();
});
