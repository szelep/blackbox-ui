import {
  act,
  render,
  screen,
} from '@testing-library/react';
import { PublishDistanceItem } from './PublishDistanceItem';

beforeEach(() => {
  jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-01 12:00:00'));
});

it('should render published text on past date', () => {
  render(<PublishDistanceItem publishAt={new Date('2020-01-01 11:55:00')} />);

  expect(screen.getByText(/capsule has been published!/i)).toBeInTheDocument();
  expect(screen.getByText(/5 minutes ago/i)).toBeInTheDocument();
});

it('should render queue text on future date', () => {
  render(<PublishDistanceItem publishAt={new Date('2020-01-01 12:10:00')} />);

  expect(screen.getByText(/capsule will be published.../i)).toBeInTheDocument();
  expect(screen.getByText(/in 10 minutes/i)).toBeInTheDocument();
});

it('should dynamically update timer text', async () => {
  render(<PublishDistanceItem publishAt={new Date('2020-01-01 12:00:50')} />);

  expect(screen.getByText(/in 50 seconds/i)).toBeInTheDocument();

  await act(() => {
    jest.advanceTimersByTime(10000);
  });

  expect(screen.getByText(/in 40 seconds/i)).toBeInTheDocument();
});
