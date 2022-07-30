import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { StatusIcon } from './StatusIcon';

/**
 * Renders list item with current status info.
 *
 * @param {object} props - root props
 * @param {string} props.status - current status name
 * @returns {StatusItem}
 */
export function StatusItem({ status }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <StatusIcon statusName={status} />
      </ListItemAvatar>
      <ListItemText
        primary="Current status"
        secondary={(
          <Typography
            component="span"
            variant="body2"
            color="primary"
          >
            {status}
          </Typography>
        )}
      />
    </ListItem>
  );
}

StatusItem.propTypes = {
  status: PropTypes.string.isRequired,
};
