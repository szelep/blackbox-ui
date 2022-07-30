import PropTypes from 'prop-types';
import {
  Divider,
  List,
  Paper,
} from '@mui/material';
import { PublishDistanceItem } from './PublishDistanceItem';
import { StatusItem } from './StatusItem';
import { UrlItem } from './UrlItem';

/**
 * Capsule data renderer.
 *
 * @param {object} props - root props
 * @param {object} props.data - capsule data
 * @returns {CapsuleSummary}
 */
export function CapsuleSummary({ data }) {
  return (
    <Paper
      elevation={4}
      sx={{
        mt: (t) => t.spacing(1),
        padding: (t) => t.spacing(2),
      }}
    >
      <List sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
      >
        <StatusItem status={data.status} />
        <Divider variant="inset" component="li" />
        <PublishDistanceItem publishAt={new Date(data.publishAt)} />
        <Divider variant="inset" component="li" />
        <UrlItem id={data.id} />
      </List>
    </Paper>
  );
}

CapsuleSummary.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    publishAt: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
