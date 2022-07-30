import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Application header.
 *
 * @returns {Header}
 */
export function Header() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
    >
      <Box>
        <Typography
          variant="h2"
          fontWeight={100}
          component={Link}
          sx={{
            color: 'black',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          to="/"
        >
          Blackb
          <LockClockOutlinedIcon fontSize="large" />
          x
        </Typography>
        <Divider />
      </Box>

      <Accordion sx={{
        mt: (t) => t.spacing(3),
        mb: (t) => t.spacing(5),
      }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="header"
        >
          <Typography>About</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            Blackbox is a simple tool that allows scheduled publication of text content.
          </Typography>
          <Typography variant="body2">
            Content that you provide will be readable only after publication date.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
