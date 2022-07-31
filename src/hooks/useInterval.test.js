import {
  act,
  render,
} from '@testing-library/react';
import { useInterval } from './useInterval';

beforeEach(() => {
  jest.useFakeTimers();
});

const mockFn = jest.fn();
const Component = () => {
  useInterval(() => mockFn());
};

it('should invoke callback every 1000ms', async () => {
  render(<Component />);

  await act(() => {
    jest.advanceTimersByTime(5000);
  });

  expect(mockFn).toBeCalledTimes(5);
});
