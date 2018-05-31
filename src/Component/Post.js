import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded : null};
  }

  render() {
    const post = this.props.post;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>{post.title}</Typography>
          <Typography>{post.post_username}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{post.page_text}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Post;