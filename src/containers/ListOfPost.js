import React from 'react';
import Post from './Post';
import {connect} from 'react-redux'
import { Paper } from '@material-ui/core';

class ListOfPost extends React.Component {
  render() {
    const rows  = this.props.posts.map((post) => 
      <Post post = {post} key = {post.id}/>
    );

    return (
      <Paper style={{maxHeight: 570, overflow: 'auto'}}>
        {rows}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.postsOfThread
  };
}

export default connect(mapStateToProps)(ListOfPost);