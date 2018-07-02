import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';

class Post extends React.Component {
  render() {
    const post = this.props.post;

    const pageText = post.page_text.length <= 25 ? post.page_text : post.page_text.substr(0,25) + '...';
    const title = post.title == '' ? pageText : post.title;

    return (
      <a className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h6 className="mb-1"><strong>{title}</strong> {this.props.updated ? <span className="badge badge-success">Updated</span> : <span className="badge badge-primary">New</span>} </h6>
        </div>
        <small><strong>{post.post_username}</strong></small>
      </a>
    );
  }
}

export default Post;