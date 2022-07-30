import {
  render,
  screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

it('should render expected footer elements', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: /go to gihtub\.com\/szelep/i })).toBeInTheDocument();
  expect(screen.getByText(/made by/i)).toBeInTheDocument();
  expect(screen.getByTestId('GitHubIcon')).toBeInTheDocument();
});
