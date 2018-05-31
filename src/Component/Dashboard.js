import React from 'react';
import { STREAM_POST } from '../DummyData/DataPost';
import { STREAM_THREAD } from '../DummyData/DataThread';
import ListOfPost from './ListOfPost';
import ListOfThread from './ListOfThread';
import { Grid } from '@material-ui/core';

class Dashboard extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs>
          <ListOfThread threads = {STREAM_THREAD} />
        </Grid>
        <Grid item xs={8}>
          <ListOfPost posts = {STREAM_POST} />
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;