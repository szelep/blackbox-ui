import {
  render,
  screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageWrapper } from './PageWrapper';

it('should render given children', () => {
  render(
    <MemoryRouter>
      <PageWrapper>
        <p>test</p>
      </PageWrapper>
    </MemoryRouter>
  );

  expect(screen.getByText(/test/i)).toBeInTheDocument();
});
