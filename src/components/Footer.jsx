import {
  Box,
  Link,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * Application footer.
 *
 * @returns {Footer}
 */
export function Footer() {
  return (
    <Box sx={{
      display: 'flex',
      mt: (t) => t.spacing(3),
      justifyContent: 'center',
    }}
    >
      <Typography variant="caption" sx={{ color: '#FFF' }}>
        Made by&nbsp;
        <GitHubIcon />
        <Link
          aria-label="Go to gihtub.com/szelep"
          href="https://github.com/szelep"
          rel="noopener noreferrer"
          sx={{
            color: '#FFF',
          }}
        >
          github.com/szelep
        </Link>
      </Typography>
    </Box>
  );
}
