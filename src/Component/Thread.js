import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

class Thread extends React.Component {
  render() {
    const thread = this.props.thread;

    return (
    <ListItem button divider>
      <ListItemText
      primary = {thread.title}
      secondary = {thread.post_username}
      />
    </ListItem>
    );
  }
}

export default Thread;