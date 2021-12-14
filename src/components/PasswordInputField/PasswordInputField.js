import { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PropTypes from 'prop-types';

PasswordInputField.propTypes = {
  inputId: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  helperTextFor: PropTypes.string.isRequired,
};

const determineWhichHelperTextShow = (helperTextFor, errors) => {
  switch (helperTextFor) {
    case 'signUpForm':
      return errors.password?.message || '7 characters minimum';

    case 'signInForm':
      return (
        errors.password?.message ||
        (errors.incorrectCredentials && (
          <Typography
            color="#d32f2f"
            sx={{ display: 'block', mt: 1, mb: 1 }}
            component="span"
          >
            The email or password you entered is incorrect
          </Typography>
        ))
      );

    default:
      return '';
  }
};

export default function PasswordInputField({
  inputId,
  autoComplete,
  register,
  errors,
  helperTextFor,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      required
      fullWidth
      name="password"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      id={inputId}
      autoComplete={autoComplete}
      margin="normal"
      {...register('password')}
      error={Boolean(errors.password)}
      helperText={determineWhichHelperTextShow(helperTextFor, errors)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
              <IconButton
                aria-label="toggle password visibility"
                aria-controls="password"
                onClick={() => setShowPassword(bool => !bool)}
                onMouseDown={e => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}
