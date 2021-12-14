import { Box } from '@mui/system';
import PropTypes from 'prop-types';

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Wrapper({ children, sx, ...options }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 5,
        ...sx,
      }}
      {...options}
    >
      {children}
    </Box>
  );
}
