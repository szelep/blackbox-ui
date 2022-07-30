import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { PasswordField } from './PasswordField';

function WrappedComponent() {
  const { control } = useForm({
    defaultValues: { somename: '' },
    mode: 'all',
  });

  return (
    <PasswordField name="somename" control={control} helperText="some helper" />
  );
}

it('should render expected field with helper text', () => {
  render(
    <WrappedComponent />
  );

  expect(screen.getByText(/some helper/i)).toBeInTheDocument();
  expect(screen.getByLabelText('Password *')).toBeInTheDocument();
  expect(screen.getByLabelText('Password *')).toHaveAttribute('type', 'password');
});

it('should change input type to text', () => {
  render(
    <WrappedComponent />
  );

  userEvent.click(screen.getByTestId('VisibilityIcon'));

  expect(screen.getByLabelText('Password *')).toHaveAttribute('type', 'text');
});

it('should render validation error instead of helper text', async () => {
  render(
    <WrappedComponent />
  );

  userEvent.click(screen.getByLabelText('Password *'));
  userEvent.click(document.body);

  await screen.findByText(/This field must not be blank./i);
});
