import {
  Box,
  CircularProgress,
} from '@mui/material';

/**
 * Renders circular progress spinner in flex container.
 *
 * @returns {ContentLoader}
 */
export function ContentLoader() {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
}
