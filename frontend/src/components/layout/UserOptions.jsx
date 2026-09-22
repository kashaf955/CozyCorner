import React from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { SpeedDialIcon } from '@mui/material';      
import { Logout } from '@mui/icons-material';

const UserOptions = ({ user }) => {
  return (
    <SpeedDial
      ariaLabel="User Options"
      sx={{ position: 'fixed', bottom: 20, right: 20 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction icon={<img src={user.avatar.url} alt="Profile" />} tooltipTitle="Profile" />
      <SpeedDialAction icon={<Logout />} tooltipTitle="Logout" />
    </SpeedDial>
  )
}

export default UserOptions