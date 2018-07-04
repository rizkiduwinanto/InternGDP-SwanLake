import React from 'react';
import ListOfPost from '../containers/ListOfPost';
import ListOfThread from '../containers/ListOfThread';
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
    const titleThread = this.props.forum.forum_name != null ? 'Thread of '+this.props.forum.forum_name : 'Thread';
    const titlePost = this.props.forum.forum_name != null ? 'Post of '+this.props.forum.forum_name : 'Post';
    return (
      <Grid container>
        <Grid item xs>
          <h1 style={styles}>{titleForum}</h1>
          <ListOfForum/>
        </Grid>
        <Grid item xs>
          <h1 style={styles}>{titleThread}</h1>
          <ListOfThread/>
        </Grid>
        <Grid item xs>
          <h1 style={styles}>{titlePost}</h1>
          <ListOfPost/>
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