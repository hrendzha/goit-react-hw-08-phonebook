import { memo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import Logo from 'components/Logo';

PcNav.propTypes = {
  user: PropTypes.object,
};

function PcNav({ user }) {
  return (
    <>
      <Logo type="pc" />

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexGrow: 1,
          alignItems: 'center',
        }}
        component="nav"
      >
        <List sx={{ display: 'flex', flexGrow: 1 }}>
          <ListItem>
            <NavLink to="/" exact activeClassName="activeNavLinkPc">
              Home
            </NavLink>
          </ListItem>
          {user && (
            <ListItem>
              <NavLink to="/contacts" activeClassName="activeNavLinkPc">
                Contacts
              </NavLink>
            </ListItem>
          )}
        </List>

        {!user && (
          <List sx={{ display: 'flex' }}>
            <ListItem>
              <NavLink to="/register" activeClassName="activeNavLinkPc">
                Sign up
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/login" activeClassName="activeNavLinkPc">
                Sign in
              </NavLink>
            </ListItem>
          </List>
        )}
      </Box>
    </>
  );
}

export default memo(PcNav);
