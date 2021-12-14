import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material';
import Logo from 'components/Logo';

const theme = createTheme({
  components: {
    // Name of the component
    MuiMenuItem: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: 0,
        },
      },
    },
  },
});

MobileNav.propTypes = {
  user: PropTypes.object,
};

function MobileNav({ user }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = e => {
    setAnchorElNav(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: user ? 1 : 0,
          display: { xs: 'flex', md: 'none' },
        }}
      >
        <IconButton
          size="large"
          aria-label="menu-navigation"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <NavLink
              to="/"
              exact
              activeClassName="activeNavLink"
              className="navLink"
            >
              Home
            </NavLink>
          </MenuItem>
          {user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink
                to="/contacts"
                activeClassName="activeNavLink"
                className="navLink"
              >
                Contacts
              </NavLink>
            </MenuItem>
          )}

          {!user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink
                to="/register"
                activeClassName="activeNavLink"
                className="navLink"
              >
                Sign up
              </NavLink>
            </MenuItem>
          )}
          {!user && (
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink
                to="/login"
                activeClassName="activeNavLink"
                className="navLink"
              >
                Sign in
              </NavLink>
            </MenuItem>
          )}
        </Menu>
      </Box>

      <Logo type="mobile" />
    </ThemeProvider>
  );
}

export default memo(MobileNav);
