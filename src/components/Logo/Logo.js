import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { Box } from '@mui/system';

Logo.propTypes = {
  type: PropTypes.string.isRequired,
};

export default function Logo({ type }) {
  const sx = {
    display: {
      xs: type === 'mobile' ? 'flex' : 'none',
      md: type === 'mobile' ? 'none' : 'flex',
    },
    flexGrow: {
      xs: 1,
      md: 0,
    },
    mr: { md: 2 },
  };

  return (
    <Box sx={sx}>
      <Link
        variant="h6"
        color="inherit"
        sx={{
          textDecoration: 'none',
        }}
        component={RouterLink}
        to="/"
      >
        PHONEBOOK
      </Link>
    </Box>
  );
}
