import { useState } from 'react';
import { Box } from '@mui/system';
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuth } from 'hooks/useAuth';
import { useLogOutMutation } from 'services/api';
import { stringAvatar } from 'utils/backgroundLetterAvatars';
import CircularLoader from 'components/CircularLoader';

export default function UserMenu() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { name } = useAuth();

  const [logOut, { isLoading: isLogOutLoading }] = useLogOutMutation();
  const handleLogOut = async () => {
    try {
      await logOut().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
          aria-label="account of current user"
          aria-controls="user-account"
          aria-haspopup="true"
        >
          <Avatar {...stringAvatar(name)} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="user-account"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleLogOut} disabled={isLogOutLoading}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
          {isLogOutLoading && <CircularLoader />}
        </MenuItem>
      </Menu>
    </Box>
  );
}
