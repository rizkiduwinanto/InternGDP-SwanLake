import React from 'react';
import ListOfPost from '../containers/ListOfPost';
import ListOfThread from '../containers/ListOfThread';
import { Grid, Typography } from '@material-ui/core';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs>
            <ListOfThread/>
          </Grid>
          <Grid item xs={8}>
            <ListOfPost/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;