import {
  render,
  screen,
} from '@testing-library/react';
import { AccessDenied } from './AccessDenied';

it('should render access denied message', () => {
  render(
    <AccessDenied />
  );

  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});
