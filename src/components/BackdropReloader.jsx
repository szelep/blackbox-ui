import PropTypes from 'prop-types';
import { useState } from 'react';
import { isPast } from 'date-fns';
import {
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useInterval } from '../hooks/useInterval';
import { useReloadListener } from '../providers/ReloadListenerProvider';

/**
 * Triggers reload capsule from API on publication date.
 *
 * @param {object} props - root props
 * @param {Date} props.publicationDate - publication date
 * @returns {BackdropReloader}
 */
export function BackdropReloader({ publicationDate }) {
  const past = isPast(publicationDate);
  const [called, setCalled] = useState(false);
  const { reload } = useReloadListener();

  useInterval(() => {
    if (past === false && isPast(publicationDate) !== past) {
      setCalled(true);
      setTimeout(() => {
        reload('capsule');
        setCalled(false);
      }, 2000);
    }
  }, [past]);

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={called}
      data-testid="backdrop-container"
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

BackdropReloader.propTypes = {
  publicationDate: PropTypes.instanceOf(Date).isRequired,
};
