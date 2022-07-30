import {
  render,
  screen,
} from '@testing-library/react';
import { CapsuleSummary } from './Capsule.summary';

jest.mock('./StatusItem', () => ({
  StatusItem: () => <li data-testid="status-item">StatusItem component</li>,
}));
jest.mock('./PublishDistanceItem', () => ({
  PublishDistanceItem: () => <li data-testid="publish-distance-item">PublishDistanceItem component</li>,
}));
jest.mock('./UrlItem', () => ({
  UrlItem: () => <li data-testid="url-item">UrlItem component</li>,
}));

it('should render expected sub-components', () => {
  render(<CapsuleSummary data={{}} />);

  expect(screen.getByTestId('status-item')).toBeInTheDocument();
  expect(screen.getByTestId('publish-distance-item')).toBeInTheDocument();
  expect(screen.getByTestId('url-item')).toBeInTheDocument();
});
