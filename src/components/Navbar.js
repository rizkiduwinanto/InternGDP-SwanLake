import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Navbar extends React.Component {
    render() {
      return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Explore One
            </Typography>
          </Toolbar>
        </AppBar>
      );
    }
  }

export default Navbar;
  