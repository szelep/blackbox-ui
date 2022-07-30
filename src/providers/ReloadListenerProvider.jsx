import {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

export const ReloadListenerContext = createContext({});

const ACTION_TYPES = {
  TRIGGER: 'trigger',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.TRIGGER:
      return {
        ...state,
        [action.value]: !state[action.value] ? 1 : state[action.value] + 1,
      };
    default:
      return state;
  }
};

/**
 * Provides functions to watch reload state and force reload elements.
 *
 * @param {object} props - root props
 * @param {Node} props.children - children
 * @returns {ReloadListenerProvider}
 */
export function ReloadListenerProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    {},
    undefined
  );

  const watch = useCallback(
    (keys) => {
      const listenerKeys = Array.isArray(keys) ? keys : [keys, ''];

      return listenerKeys.reduce((a, b) => (state[a] || 0) + (state[b] || 0));
    },
    [state],
  );

  return (
    <ReloadListenerContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        ...state,
        watch,
        reload: (id) => {
          dispatch({
            type: ACTION_TYPES.TRIGGER,
            value: id,
          });
        },
      }}
    >
      {children}
    </ReloadListenerContext.Provider>
  );
}

ReloadListenerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useReloadListener = () => useContext(ReloadListenerContext);
