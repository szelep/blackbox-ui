import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UrlItem } from './UrlItem';

let windowSpy;
beforeEach(() => {
  windowSpy = jest.spyOn(window, 'navigator', 'get');
});

afterEach(() => windowSpy.mockRestore());

it('should render icon with link', () => {
  render(
    <UrlItem id="1c11ec61-0f73-4a0f-a3f7-1506cf0ca954" />
  );

  expect(screen.getByText(/https:\/\/blackbox.link\/v\/1c11ec61-0f73-4a0f-a3f7-1506cf0ca954/i))
    .toBeInTheDocument();
  expect(screen.getByTestId('QrCode2OutlinedIcon')).toBeInTheDocument();
  expect(screen.getByTestId('ContentCopyOutlinedIcon')).toBeInTheDocument();
});

it('should copy link on icon click', async () => {
  const mockWriteText = jest.fn();
  windowSpy.mockImplementation(() => ({
    clipboard: {
      writeText: mockWriteText,
    },
  }));

  render(
    <UrlItem id="1c11ec61-0f73-4a0f-a3f7-1506cf0ca954" />
  );

  await userEvent.click(screen.getByTestId('ContentCopyOutlinedIcon'));
  expect(mockWriteText).toBeCalledWith('https://blackbox.link/v/1c11ec61-0f73-4a0f-a3f7-1506cf0ca954');
});
