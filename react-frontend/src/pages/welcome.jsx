
import React from 'react';
import {
  useNavigate,
} from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RobotPrototype from '../resources/img/prototype.jpg';

export default function () {
  const theme = useTheme();
  const navigate = useNavigate();
  return <Stack direction='row' gap={2} sx={{height: '100%'}}>
    <Box sx={{ flex: 1, height: '100%' }}>
      <Stack sx={{ justifyContent: 'space-around', height: '100%', alignItems: 'center' }}>
        <Box>
          <Typography fontSize={60}>Welcome</Typography>
          <Box>
            <Button
              size='large'
              sx={{
                backgroundColor: theme.robotpi.lightFill,
                color: '#fff',
                borderRadius: '20px',
              }}
              onClick={() => navigate('/contacts')}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
    <Box sx={{ flex: 1 }}>
      <img src={RobotPrototype} alt="Robot Prototype" width='100%' style={{}}/>;
    </Box>
  </Stack>
}