import React from 'react';
import Post from './Post';
import {connect} from 'react-redux'

class ListOfPost extends React.Component {
  render() {
    const rows  = [];
    this.props.posts.forEach((post) => {
      rows.push(<Post post = {post} key = {post.id}/>);
    });

    return (
      <div>
        {rows}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts : state.posts
  };
}
export default connect(mapStateToProps)(ListOfPost);