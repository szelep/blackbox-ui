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
    <Typography>
      Are you owner of this capsule?&nbsp;
      <Link to={`/capsules/${id}/edit`}>Click here to edit</Link>
    </Typography>
  );
}

OwnerInfo.propTypes = {
  id: PropTypes.string.isRequired,
};
