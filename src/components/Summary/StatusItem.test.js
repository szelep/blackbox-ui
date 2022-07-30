import {
  render,
  screen,
} from '@testing-library/react';
import { StatusItem } from './StatusItem';

it('should render provided status name', () => {
  render(
    <StatusItem status="unknown" />
  );

  expect(screen.getByText(/current status/i)).toBeInTheDocument();
  expect(screen.getByText(/unknown/i)).toBeInTheDocument();
});
