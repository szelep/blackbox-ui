import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionButtons } from './ActionButtons';
import { GlobalDialogContext } from '../providers/GlobalDialogProvider';
import { UnpublishForm } from './Unpublish.form';

it('should render submit button on blank id', () => {
  render(
    <ActionButtons
      disable={false}
      onSaveClick={() => {}}
    />
  );

  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /save changes/i })).not.toBeInTheDocument();
});

it('should render save changes button on id provided', () => {
  render(
    <ActionButtons
      disable={false}
      onSaveClick={() => {}}
      capsuleId="cd194760-ad99-410e-b24f-878b85571781"
    />
  );

  expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument();
});

it('should render only "unpublish" button for published capsule', () => {
  render(
    <ActionButtons
      disable={false}
      onSaveClick={() => {}}
      capsuleStatus="published"
      capsuleId="6e36f020-091a-4b19-967f-9a11f56326c5"
    />
  );

  expect(screen.getByRole('button', { name: /unpublish/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /save changes/i })).not.toBeInTheDocument();
});

it('should invoke on submit function on submit click', async () => {
  const onSaveStub = jest.fn();
  render(
    <ActionButtons
      disable={false}
      onSaveClick={onSaveStub}
    />
  );

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSaveStub).toBeCalled();
});

it('should unpublish button click invoke global dialog', async () => {
  const renderDialogMock = jest.fn();
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <GlobalDialogContext.Provider value={{ render: renderDialogMock }}>
      <ActionButtons
        disable={false}
        onSaveClick={() => {}}
        capsuleStatus="published"
        capsuleId="a2634538-59f2-411f-8776-38e4da8ade8e"
      />
    </GlobalDialogContext.Provider>
  );

  await userEvent.click(screen.getByRole('button', { name: /unpublish/i }));

  expect(renderDialogMock).toBeCalledWith(<UnpublishForm capsuleId="a2634538-59f2-411f-8776-38e4da8ade8e" />, 'xs');
});
