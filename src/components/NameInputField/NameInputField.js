import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

NameInputField.propTypes = {
  autoFocus: PropTypes.bool,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default function NameInputField({
  autoFocus = false,
  register,
  errors,
}) {
  return (
    <TextField
      required
      fullWidth
      autoFocus={autoFocus}
      autoComplete="given-name"
      name="name"
      id="given-name"
      label="Name"
      margin="normal"
      {...register('name')}
      error={Boolean(errors.name)}
      helperText={errors.name?.message}
    />
  );
}
