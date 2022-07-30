import {
  useCallback,
  useEffect,
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

  useEffect(() => {
    const timer = setInterval(() => setDistanceText(getDistance()), 1000);

    return () => clearInterval(timer);
  }, [distanceText]);

  return (
    <ListItem alignItems="flex-start">
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
