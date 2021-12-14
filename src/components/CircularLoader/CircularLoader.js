import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

CircularLoader.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sx: PropTypes.object,
};

export default function CircularLoader({ size = 24, sx }) {
  return (
    <CircularProgress
      size={size}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
        ...sx,
      }}
    />
  );
}
