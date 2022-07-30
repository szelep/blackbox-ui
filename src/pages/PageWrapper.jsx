import {
  Container,
  Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import { GlobalDialogProvider } from '../providers/GlobalDialogProvider';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

/**
 * Customized page wrapper with toolbar header.
 *
 * @param {object} props - root props
 * @param {Node} props.children - component children
 * @returns {Container}
 */
export function PageWrapper({ children }) {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          mt: 0,
          mb: 4,
          backgroundColor: '#FFF',
          padding: (t) => t.spacing(1.5),
        }}
        component={Paper}
        elevation={5}
      >
        <GlobalDialogProvider>
          <Header />
          {children}
        </GlobalDialogProvider>
      </Container>
      <Footer />
    </>

  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
