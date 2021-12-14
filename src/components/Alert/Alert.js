import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert as MuiAlert, Slide } from '@mui/material';
import { selectAlertOptions, hideAlert } from 'redux/alert/alertSlice';

const SlideTransition = props => <Slide {...props} direction="left" />;

export default function Alert({ setAlertOptions }) {
  const alertOptions = useSelector(selectAlertOptions);
  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideAlert());
  };

  return (
    <Snackbar
      open={alertOptions.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={SlideTransition}
    >
      <MuiAlert
        onClose={handleClose}
        severity={alertOptions.type}
        sx={{ width: '100%' }}
        variant="filled"
        elevation={8}
      >
        {alertOptions.message}
      </MuiAlert>
    </Snackbar>
  );
}
