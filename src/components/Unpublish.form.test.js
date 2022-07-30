import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UnpublishForm } from './Unpublish.form';
import { requestService } from '../services/requestService';
import { SnackbarContext } from '../providers/SnackbarProvider';

jest.mock('../services/requestService');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

it('should display validation error on empty password attempt submit', async () => {
  render(
    <UnpublishForm capsuleId="aa19653a-ade1-49ec-afd2-f977adbec207" />
  );

  userEvent.click(screen.getByRole('button', { name: /confirm/i }));

  await waitFor(() => {
    expect(screen.getByText('This field must not be blank.')).toBeInTheDocument();
  });
});

it('should send expected PUT request on valid form submission', async () => {
  const mockSnackSuccess = jest.fn();
  requestService.put.mockResolvedValueOnce({ data: {} });
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SnackbarContext.Provider value={{
      error: jest.fn(),
      success: mockSnackSuccess,
    }}
    >
      <UnpublishForm capsuleId="aa19653a-ade1-49ec-afd2-f977adbec207" />
    </SnackbarContext.Provider>
  );

  userEvent.type(screen.getByLabelText(/Password/), 'test');
  userEvent.click(screen.getByRole('button', { name: /confirm/i }));

  await waitFor(() => {
    expect(mockSnackSuccess).toBeCalledWith('Capsule has been unpublished successfully!');
  });
  expect(requestService.put).toBeCalledWith(
    'http://127.0.0.1:8000/api/capsules/aa19653a-ade1-49ec-afd2-f977adbec207/unpublish',
    {
      modificationPassword: 'test',
    }
  );
});

it('should append API errors to form', async () => {
  const mockSnackError = jest.fn();
  requestService.put.mockRejectedValueOnce({
    response: {
      data: {
        violations: [{
          propertyPath: 'modificationPassword',
          message: 'API ERROR',
        }],
      },
    },
  });
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SnackbarContext.Provider value={{
      error: mockSnackError,
      success: jest.fn(),
    }}
    >
      <UnpublishForm capsuleId="aa19653a-ade1-49ec-afd2-f977adbec207" />
    </SnackbarContext.Provider>
  );

  userEvent.type(screen.getByLabelText(/Password/), 'test');
  userEvent.click(screen.getByRole('button', { name: /confirm/i }));

  await waitFor(() => {
    expect(mockSnackError).toBeCalledWith('An error occured.');
  });
  expect(screen.getByText('API ERROR')).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/)).toBeInvalid();
});
