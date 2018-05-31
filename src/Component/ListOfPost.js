import React from 'react';
import Post from './Post';

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

export default ListOfPost;