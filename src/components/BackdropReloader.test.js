import {
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BackdropReloader } from './BackdropReloader';
import { ReloadListenerContext } from '../providers/ReloadListenerProvider';

beforeEach(() => {
  jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-01'));
});

it('should backdrop be still hidden if publication date is after current date', async () => {
  render(
    <BackdropReloader publicationDate={new Date('2021-01-01')} />
  );
  await act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(screen.getByTestId('backdrop-container')).not.toBeVisible();
});

it('should backdrop appear on same date', async () => {
  render(
    <BackdropReloader publicationDate={new Date('2020-01-01')} />
  );

  await act(() => {
    jest.advanceTimersByTime(1000);
  });

  await waitFor(() => {
    expect(screen.getByTestId('backdrop-container')).toBeVisible();
  });
});

it('should trigger reload on expected time', async () => {
  const mockReload = jest.fn();
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ReloadListenerContext.Provider value={{ reload: mockReload }}>
      <BackdropReloader publicationDate={new Date('2020-01-01')} />
    </ReloadListenerContext.Provider>
  );

  await act(() => {
    jest.advanceTimersByTime(3000);
  });

  await waitFor(() => {
    expect(mockReload).toBeCalled();
  });
});
