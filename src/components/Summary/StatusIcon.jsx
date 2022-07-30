import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

/**
 * Renders icon matched to status.
 *
 * @param {object} props - root props
 * @param {string} props.statusName - status name
 * @returns {StatusIcon}
 */
export function StatusIcon({ statusName }) {
  const icons = useMemo(() => ({
    queued: <PauseCircleOutlineOutlinedIcon fontSize="large" color="warning" />,
    published: <DoneAllOutlinedIcon fontSize="large" color="success" />,
  }), []);

  return icons[statusName] || <QuestionMarkOutlinedIcon color="error" />;
}

StatusIcon.propTypes = {
  statusName: PropTypes.string.isRequired,
};
