import React from 'react';
import { List } from '@material-ui/core';
import Thread from './Thread';

class ListOfThread extends React.Component {
  render() {
    const rows = this.props.threads.map((thread) =>
      <Thread thread = {thread} key = {thread.id}/>
    );

    return (
      <List>
        {rows}
      </List>
    );
  }
}

export default ListOfThread;