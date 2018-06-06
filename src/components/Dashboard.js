import React from 'react';
import ListOfPost from '../containers/ListOfPost';
import ListOfThread from '../containers/ListOfThread';
import ListOfForum from '../containers/ListOfForum';
import { Grid } from '@material-ui/core';

class Dashboard extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs>
          <ListOfForum/>
        </Grid>
        <Grid item xs>
          <ListOfThread/>
        </Grid>
        <Grid item xs>
          <ListOfPost/>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;