import { Button } from '@mui/material';
import CircularLoader from 'components/CircularLoader';
import PropTypes from 'prop-types';

SubmitFormBtn.propTypes = {
  children: PropTypes.node.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  sx: PropTypes.object,
};

export default function SubmitFormBtn({
  children,
  isSubmitting,
  sx,
  ...options
}) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      fullWidth
      variant="contained"
      sx={{ mt: 3, ...sx }}
      {...options}
    >
      {children}
      {isSubmitting && <CircularLoader />}
    </Button>
  );
}
