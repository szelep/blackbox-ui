import {
  useCallback,
  useState,
} from 'react';
import {
  formatDistanceToNowStrict,
  isPast,
} from 'date-fns';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import PropTypes from 'prop-types';
import { useInterval } from '../../hooks/useInterval';

/**
 * Renders list item with date distance info.
 *
 * @param {object} props - root props
 * @param {Date} props.publishAt - capsule "publishAt" date
 * @returns {PublishDistanceItem}
 */
export function PublishDistanceItem({ publishAt }) {
  const getDistance = useCallback(() => formatDistanceToNowStrict(
    publishAt,
    { addSuffix: true }
  ), [publishAt]);
  const [distanceText, setDistanceText] = useState(getDistance());
  useInterval(() => {
    setDistanceText(getDistance());
  });

  return (
    <ListItem>
      <ListItemAvatar>
        <HourglassBottomOutlinedIcon fontSize="large" />
      </ListItemAvatar>
      <ListItemText
        primary={
          isPast(publishAt) ? 'Capsule has been published!' : 'Capsule will be published...'
        }
        secondary={(
          <Typography
            component="span"
            variant="body2"
            color="primary"
          >
            {distanceText}
          </Typography>
        )}
      />
    </ListItem>
  );
}

PublishDistanceItem.propTypes = {
  publishAt: PropTypes.instanceOf(Date).isRequired,
};
