import {
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useGlobalDialog } from '../providers/GlobalDialogProvider';
import { UnpublishForm } from './Unpublish.form';

/**
 * Capsule action buttons.
 *
 * @param {object} props - root props
 * @param {boolean} props.disable - are buttons disabled
 * @param {Function} props.onSaveClick - function invoked on save button click
 * @param {string|null} props.capsuleStatus - current capsule status
 * @param {string|null} props.capsuleId - current capsule identifier
 * @returns {ActionButtons}
 */
export function ActionButtons({
  disable, onSaveClick, capsuleStatus, capsuleId,
}) {
  const { render } = useGlobalDialog();
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      mt: (t) => t.spacing(3),
    }}
    >
      {capsuleStatus !== 'published' && (
        <Button
          fullWidth
          disabled={disable}
          id="9KjftYh4BRCj548"
          onClick={onSaveClick}
          variant="contained"
          color="primary"
        >
          {capsuleId ? 'Save changes' : 'Submit'}
          {disable && (
            <CircularProgress
              aria-label="Awaits for request finish"
              sx={{
                position: 'absolute',
              }}
              size={16}
            />
          )}
        </Button>
      )}
      {capsuleStatus === 'published' && (
        <Button
          fullWidth
          disabled={disable}
          id="wqm26cR8ks89uH6"
          onClick={() => render(<UnpublishForm capsuleId={capsuleId} />, 'xs')}
          variant="contained"
          color="error"
        >
          Unpublish
        </Button>
      )}
    </Box>
  );
}

ActionButtons.propTypes = {
  disable: PropTypes.bool.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  capsuleStatus: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  capsuleId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};

ActionButtons.defaultProps = {
  capsuleId: null,
  capsuleStatus: null,
};
