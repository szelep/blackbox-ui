import {
  render,
  screen,
} from '@testing-library/react';
import { RouterSwitch } from './RouterSwitch';

jest.mock('../pages/Dashboard', () => ({
  Dashboard: () => <p>Dashboard page</p>,
}));

it('should render default page', () => {
  render(<RouterSwitch />);

  expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
});
