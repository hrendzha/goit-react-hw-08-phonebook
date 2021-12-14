import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" component={RouterLink} to={process.env.PUBLIC_URL}>
        Phonebook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
