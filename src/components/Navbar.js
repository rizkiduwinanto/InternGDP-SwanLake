import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';

class Navbar extends React.Component {
    renderButton() {
      return (
        <Tabs>
          <Tab label="MAIN"/>
          <Tab label="FREQUENT"/>
          <Tab label="WORDCLOUD"/>
          <Tab label="TIMESERIES"/>
        </Tabs>
      );
    }

    render() {
      return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Dashboard
            </Typography>
          </Toolbar>
          {this.renderButton()}
        </AppBar>
      );
    }
  }

export default Navbar;
  