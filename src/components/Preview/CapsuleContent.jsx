import PropTypes from 'prop-types';
import {
  Box,
  MenuList,
  Paper,
} from '@mui/material';
import DOMPurify from 'dompurify';
import { OwnerInfo } from './OwnerInfo';
import { PublishDistanceItem } from '../Summary/PublishDistanceItem';

/**
 * Renders capsule content.
 *
 * @param {object} props - root props
 * @param {object} props.data - capsule data
 * @param {string|null} props.data.content - capsule content
 * @param {string} props.data.publishAt - publication date
 * @param {string} props.data.id - capsule identifier
 * @returns {CapsuleContent}
 */
export function CapsuleContent({
  data: {
    content, publishAt, id,
  },
}) {
  if (content === null) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        mb: (t) => t.spacing(2),
      }}
      >
        <MenuList>
          <PublishDistanceItem publishAt={new Date(publishAt)} />
        </MenuList>
        <OwnerInfo id={id} />
      </Box>
    );
  }

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          padding: (t) => t.spacing(3),
          mb: (t) => t.spacing(2),
        }}
      >
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content || '') }} />
      </Paper>
      <OwnerInfo id={id} />
    </>
  );
}

CapsuleContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    publishAt: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
  }).isRequired,
};
