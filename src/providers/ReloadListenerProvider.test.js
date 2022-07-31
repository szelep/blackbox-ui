import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  useEffect,
  useState,
} from 'react';
import {
  ReloadListenerProvider,
  useReloadListener,
} from './ReloadListenerProvider';

function TestComponent() {
  const {
    watch, reload,
  } = useReloadListener();
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((s) => s + 1);
  }, [watch('some-value')]);

  return [
    <button
      key="1"
      data-testid="reload-valid-button"
      type="button"
      onClick={() => reload('some-value')}
    >
      Click
    </button>,
    <button
      key="2"
      data-testid="reload-invalid-button"
      type="button"
      onClick={() => reload('nothing-watch-this')}
    >
      Click
    </button>,
    <p key="3" data-testid="state-value">{state}</p>,
  ];
}

it('should have default bumped value', async () => {
  render(
    <ReloadListenerProvider>
      <TestComponent />
    </ReloadListenerProvider>
  );

  await waitFor(() => expect(screen.getByTestId('state-value')).toHaveTextContent('1'));
});

it('should not bump value on click unlinked button', async () => {
  render(
    <ReloadListenerProvider>
      <TestComponent />
    </ReloadListenerProvider>
  );

  userEvent.click(screen.getByTestId('reload-invalid-button'));

  await waitFor(() => expect(screen.getByTestId('state-value')).toHaveTextContent('1'));
});

it('should bump value on click valid button', async () => {
  render(
    <ReloadListenerProvider>
      <TestComponent />
    </ReloadListenerProvider>
  );

  userEvent.click(screen.getByTestId('reload-valid-button'));

  await waitFor(() => expect(screen.getByTestId('state-value')).toHaveTextContent('2'));
});
