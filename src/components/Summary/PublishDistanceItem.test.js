import {
  render,
  screen,
} from '@testing-library/react';
import { PublishDistanceItem } from './PublishDistanceItem';

const dateFnsMock = ({
  formatDistanceToNowStrict: () => '5 minutes ago',
  isPast: () => true,
});
jest.mock('date-fns', () => dateFnsMock);

it('should render published text on past date', () => {
  render(<PublishDistanceItem publishAt={new Date()} />);

  expect(screen.getByText(/capsule has been published!/i)).toBeInTheDocument();
  expect(screen.getByText(/5 minutes ago/i)).toBeInTheDocument();
});

it('should render queue text on future date', () => {
  dateFnsMock.formatDistanceToNowStrict = () => 'in 10 minutes';
  dateFnsMock.isPast = () => false;
  render(<PublishDistanceItem publishAt={new Date()} />);

  expect(screen.getByText(/capsule will be published.../i)).toBeInTheDocument();
  expect(screen.getByText(/in 10 minutes/i)).toBeInTheDocument();
});
