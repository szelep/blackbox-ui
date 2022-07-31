import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Snackbar,
} from '@mui/material';

/**
 * @typedef {object} useSnackbar
 * @property {Function} error - display snackbar error
 * @param {string} error.message - snackbar message
 * @param {number} error.autoHideDuration - hide snackbar after time
 * @property {Function} success - display snackbar success
 * @param {string} success.message - snackbar message
 * @param {number} success.autoHideDuration - hide snackbar after time
 */

export const SnackbarContext = createContext({});

const ACTION_TYPES = {
  OPEN: 'open',
  CLOSE: 'close',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.OPEN:
      return {
        ...state,
        open: true,
        type: action.value?.type,
        message: action.value?.message,
        autoHideDuration: action.value?.autoHideDuration,
      };
    case ACTION_TYPES.CLOSE:
      return {
        ...state,
        open: false,
        message: '',
      };
      /* istanbul ignore next */
    default:
      return state;
  }
};

/**
 * Provides snackbar that can be opened from any place in application.
 *
 * @param {object} props - root props
 * @param {Element|Element[]} props.children - provider children
 * @returns {SnackbarProvider}
 */
export function SnackbarProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      open: false,
      type: 'error',
      message: '',
      autoHideDuration: 3000,
    },
    undefined
  );

  const dispatchSnackbar = (message, type, autoHideDuration) => {
    dispatch({
      type: ACTION_TYPES.OPEN,
      value: {
        type,
        message,
        autoHideDuration,
      },
    });
  };

  const functions = useMemo(() => ({
    error: (message, autoHideDuration = 4000) => dispatchSnackbar(message, 'error', autoHideDuration),
    success: (message, autoHideDuration = 4000) => dispatchSnackbar(message, 'success', autoHideDuration),
  }), []);

  return (
    <SnackbarContext.Provider
      value={functions}
    >
      <Snackbar
        open={state.open}
        autoHideDuration={state.autoHideDuration}
        onClose={() => {
          dispatch({ type: ACTION_TYPES.CLOSE });
        }}
      >
        <Alert
          severity={state.type}
          sx={{
            width: '100%',
            borderRadius: 0,
            border: (t) => `1px solid ${state.type === 'success' ? t.palette.success.dark : t.palette.error.dark}`,
          }}
        >
          {state.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Use snackbar context.
 *
 * @returns {useSnackbar}
 */
export const useSnackbar = () => useContext(SnackbarContext);
