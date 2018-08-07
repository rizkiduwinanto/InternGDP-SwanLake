import React from 'react';
import ListOfPostAndThreadWithSocket from '../containers/ListOfPostAndThread';
import ListOfForum from '../containers/ListOfForum';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = {
  marginTop: 16,
  marginBottom: 16,
  marginLeft: 19, 
  fontSize: 17
}

class Dashboard extends React.Component {
  render() {
    const titleForum = this.props.forum.forum_name != null ? 'Forum : '+this.props.forum.forum_name : 'Select a forum' ;
    const titleThreadAndPost = this.props.forum.forum_name != null ? 'Thread and Post of '+this.props.forum.forum_name : 'Thread and Post';
    return (
      <Grid container>
        <Grid item xs>
          <h1 style={styles}>{titleForum}</h1>
          <ListOfForum/>
        </Grid>
        <Grid item xs>
          <h1 style={styles}>{titleThreadAndPost}</h1>
          <ListOfPostAndThreadWithSocket/>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state){
  return {
    forum: state.selectedForum,
  };
}

export default connect(mapStateToProps)(Dashboard);