import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Toolbar, Typography } from '@material-ui/core';

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
  