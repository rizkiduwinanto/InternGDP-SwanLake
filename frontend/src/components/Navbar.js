import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography style={styles.flex} variant="title" color="inherit">
              Intern GDP
            </Typography>
            <Button color="inherit" component={Link} to='/' >Dashboard</Button>
            <Button color="inherit" component={Link} to='/FrequentPoster/Global' >Frequent Poster</Button>
            <Button color="inherit" component={Link} to='/Timeseries' >Graph</Button>
            <Button color="inherit" component={Link} to='/Wordcloud' >Wordcloud</Button>
            <Button color="inherit" component={Link} to='/Keyword' >Keyword</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  }

export default Navbar;
  