import React, {FC, CSSProperties} from 'react';
import { Paper, Typography } from '@mui/material';

const paperStyle: CSSProperties = {
  padding: '16px',
  textAlign: 'center',
  color: 'white',
  backgroundColor: '#1976d2',
};

const Footer: FC = () => {
  return (
    <Paper  component="footer" elevation={3} style={paperStyle}>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Your Company Name
      </Typography>
    </Paper>
  );
};


export default Footer;