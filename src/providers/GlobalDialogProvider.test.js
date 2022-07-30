import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  GlobalDialogProvider,
  useGlobalDialog,
} from './GlobalDialogProvider';

function TestComponent() {
  const {
    render: dialogRender, closeAll,
  } = useGlobalDialog();

  return [
    <button
      key="1"
      data-testid="render-button"
      type="button"
      onClick={() => dialogRender(<p>This text will be rendered in dialog</p>)}
    >
      Click
    </button>,
    <button
      key="2"
      data-testid="close-button"
      type="button"
      onClick={() => closeAll()}
    >
      Click
    </button>,
  ];
}

it('should message and dialog not be displayed without render invoke', () => {
  render(
    <GlobalDialogProvider>
      <TestComponent />
    </GlobalDialogProvider>
  );

  expect(screen.queryByText(/this text will be rendered in dialog/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('should render dialog with provided content', () => {
  render(
    <GlobalDialogProvider>
      <TestComponent />
    </GlobalDialogProvider>
  );

  userEvent.click(screen.getByTestId('render-button'));

  expect(screen.getByText(/this text will be rendered in dialog/i)).toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it('should close opened dialog', async () => {
  render(
    <GlobalDialogProvider>
      <TestComponent />
    </GlobalDialogProvider>
  );

  userEvent.click(screen.getByTestId('render-button'));
  const dialogElement = screen.getByRole('dialog');
  expect(dialogElement).toBeInTheDocument();

  userEvent.click(screen.getByTestId('close-button'));
  await waitFor(() => waitForElementToBeRemoved(dialogElement));
});
