import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import userEvent from '@testing-library/user-event';
import { CapsuleForm } from './Capsule.form';

jest.mock('./PasswordField', () => ({
  PasswordField: () => 'PasswordField component',
}));

it('should render expected form fields', () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CapsuleForm onSubmit={() => {}} />
    </LocalizationProvider>
  );

  expect(screen.getByRole('textbox', { name: /content/i })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /choose date/i })).toBeInTheDocument();
  expect(screen.getByText(/passwordfield component/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

it('should not invoke onSubmit on invalid filled form', async () => {
  const onSubmitMock = jest.fn();
  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CapsuleForm onSubmit={onSubmitMock} />
    </LocalizationProvider>
  );

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await screen.findByText(/This field must not be blank./i);
  expect(onSubmitMock).not.toBeCalled();
});

it('should invoke onSubmit on filled form', async () => {
  const onSubmitMock = jest.fn();
  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CapsuleForm onSubmit={onSubmitMock} />
    </LocalizationProvider>
  );

  userEvent.type(screen.getByRole('textbox', { name: /protected content/i }), 'some content');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(onSubmitMock).toBeCalled();
  });
});

it('should display validation error on date field', async () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CapsuleForm onSubmit={jest.fn()} />
    </LocalizationProvider>
  );
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await screen.findByText(/This field must not be blank./i);
});

it('should hide password, date fields on published capsule and disable content', async () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CapsuleForm onSubmit={jest.fn()} initialData={{ status: 'published' }} />
    </LocalizationProvider>
  );

  expect(screen.queryByText(/passwordfield component/i)).not.toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /protected content/i })).toBeDisabled();
  expect(screen.queryByRole('textbox', { name: /choose date/i })).not.toBeInTheDocument();
});
