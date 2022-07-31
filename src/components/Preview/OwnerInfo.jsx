import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Small info with link to capsule owner.
 *
 * @param {object} props - root props
 * @param {string} props.id - capsule identifier
 * @returns {OwnerInfo}
 */
export function OwnerInfo({ id }) {
  return (
    <Typography variant="caption" sx={{ mt: (t) => t.spacing(2) }}>
      Are you owner of this capsule?&nbsp;
      <Link to={`/e/${id}`}>Click here to edit.</Link>
    </Typography>
  );
}

OwnerInfo.propTypes = {
  id: PropTypes.string.isRequired,
};
