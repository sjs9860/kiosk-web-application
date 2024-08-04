import * as React from 'react';
import PropTypes from 'prop-types';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import MenuButton from './MenuButton';

function UserInfo({ mode, toggleColorMode, ...props }) {
  return (
    <MenuButton
      onClick={toggleColorMode}
      size="small"
      aria-label="button to toggle theme"
      {...props}
    >
      <AccountCircleIcon fontSize="small" />
    </MenuButton>
  );
}

UserInfo.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default UserInfo;
