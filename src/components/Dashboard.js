import React from 'react';
import ListOfPost from '../containers/ListOfPost';
import ListOfThread from '../containers/ListOfThread';
import { Grid } from '@material-ui/core';

class Dashboard extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs>
          <ListOfThread/>
        </Grid>
        <Grid item xs={8}>
          <ListOfPost/>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;