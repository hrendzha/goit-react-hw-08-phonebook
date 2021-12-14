import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

EmailInputField.propTypes = {
  autoFocus: PropTypes.bool,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default function EmailInputField({
  autoFocus = false,
  register,
  errors,
}) {
  return (
    <TextField
      autoFocus={autoFocus}
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      inputProps={{ inputMode: 'email' }}
      autoComplete="email"
      margin="normal"
      {...register('email')}
      error={Boolean(errors.email)}
      helperText={errors.email?.message}
    />
  );
}
