import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  DialogContent,
} from '@mui/material';

export const GlobalDialogContext = createContext({});

const ACTION_TYPES = {
  OPEN: 'open',
  CLOSE: 'close',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.OPEN:
      return {
        ...state,
        dialogOpened: true,
        Component: action.value,
        maxWidth: action.maxWidth,
        wrapDialogContent: action.wrapDialogContent,
      };
    case ACTION_TYPES.CLOSE:
      return {
        dialogOpened: false,
      };
      /* istanbul ignore next */
    default:
      return state;
  }
};

/**
 * Provides dialogs that can be opened from any place in application.
 *
 * @param {object} props - root props
 * @param {Element|Element[]} props.children - provider children
 * @returns {GlobalDialogProvider}
 */
export function GlobalDialogProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      dialogOpened: false,
      maxWidth: 'xl',
    },
    undefined
  );

  const functions = useMemo(() => ({
    closeAll: () => {
      dispatch({
        type: ACTION_TYPES.CLOSE,
      });
    },
    render: (dialogComponent, maxWidth = 'xl', wrapDialogContent = true) => {
      dispatch({
        type: ACTION_TYPES.OPEN,
        value: dialogComponent,
        maxWidth,
        wrapDialogContent,
      });
    },
  }), []);

  return (
    <GlobalDialogContext.Provider
      value={functions}
    >
      <Dialog
        open={state.dialogOpened}
        maxWidth={state.maxWidth}
        fullWidth
        onClose={() => {
          /* istanbul ignore next */
          dispatch({ type: ACTION_TYPES.CLOSE });
        }}
      >
        {state.dialogOpened && (
          <Box component={state.wrapDialogContent ? DialogContent : 'div'}>
            {state.Component}
          </Box>
        )}
      </Dialog>
      {children}
    </GlobalDialogContext.Provider>
  );
}

GlobalDialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Use application menu context.
 *
 * @returns {object}
 */
export const useGlobalDialog = () => useContext(GlobalDialogContext);
