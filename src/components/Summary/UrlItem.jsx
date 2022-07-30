import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

/**
 * Renders list item with date distance info.
 *
 * @param {object} props - root props
 * @param {Date} props.id - capsule identifier
 * @returns {PublishDistanceItem}
 */
export function UrlItem({ id }) {
  const url = `https://blackbox.link/v/${id}`;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <QrCode2OutlinedIcon fontSize="large" />
      </ListItemAvatar>
      <ListItemText
        primary="Here is your URL"
        secondary={(
          <Typography
            component="span"
            variant="body2"
            color="primary"
          >
            {url}
            <Tooltip title="Copy URL">
              <IconButton onClick={() => {
                navigator.clipboard.writeText(url);
              }}
              >
                <ContentCopyOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
        )}
      />
    </ListItem>
  );
}

UrlItem.propTypes = {
  id: PropTypes.string.isRequired,
};
