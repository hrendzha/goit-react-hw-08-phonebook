import { memo } from 'react';
import { Avatar, Typography } from '@mui/material';
import PropTypes from 'prop-types';

TitleWithIcon.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.elementType,
  titleComponent: PropTypes.string,
};

function TitleWithIcon({ title, icon: Icon, titleComponent }) {
  return (
    <>
      {Icon && (
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Icon />
        </Avatar>
      )}

      {title && (
        <Typography component={titleComponent || 'h1'} variant="h5">
          {title}
        </Typography>
      )}
    </>
  );
}

export default memo(TitleWithIcon);
