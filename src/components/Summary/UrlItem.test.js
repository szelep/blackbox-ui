import {
  render,
  screen,
} from '@testing-library/react';
import { UrlItem } from './UrlItem';

it('should render icon with link', () => {
  render(
    <UrlItem id="1c11ec61-0f73-4a0f-a3f7-1506cf0ca954" />
  );

  expect(screen.getByText(/https:\/\/blackbox.link\/v\/1c11ec61-0f73-4a0f-a3f7-1506cf0ca954/i))
    .toBeInTheDocument();
  expect(screen.getByTestId('QrCode2OutlinedIcon')).toBeInTheDocument();
  expect(screen.getByTestId('ContentCopyOutlinedIcon')).toBeInTheDocument();
});
