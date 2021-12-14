import { Box } from '@mui/system';
import PropTypes from 'prop-types';

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Section({ children, ...options }) {
  return (
    <Box
      component="section"
      sx={{
        pt: 8,
        pb: 4,
      }}
      {...options}
    >
      {children}
    </Box>
  );
}
