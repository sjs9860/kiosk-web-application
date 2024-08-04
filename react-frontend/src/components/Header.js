import * as React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import ToggleColorMode from './ToggleColorMode';
import MenuButton from './MenuButton';
import UserInfo from './UserInfo';

import Search from './Search';
import { Typography } from '@mui/material';

function Header({ pageTitle, q, mode, toggleColorMode }) {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
      }}
      spacing={2}
    >
      {/* <NavbarBreadcrumbs /> */}
      <Typography>RobotPi</Typography>
      <Typography>{pageTitle}</Typography>
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* <Search q={q} /> */}
        {/* <CustomDatePicker /> */}
        {/* <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton> */}
        <ToggleColorMode
          mode={mode}
          toggleColorMode={toggleColorMode}
          data-screenshot="toggle-mode"
        />
        <UserInfo
          mode={mode}
          toggleColorMode={toggleColorMode}
          data-screenshot="toggle-mode"
        />
      </Stack>
    </Stack>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Header;
