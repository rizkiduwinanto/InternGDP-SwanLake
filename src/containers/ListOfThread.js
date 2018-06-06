import React from 'react';
import { List, Paper } from '@material-ui/core';
import {connect} from 'react-redux'
import Thread from './Thread';

class ListOfThread extends React.Component {
  render() {
    const rows = this.props.threads.map((thread) =>
      <Thread thread = {thread} key = {thread.id}/>
    );

    return (
      <Paper style={{maxHeight: 570, overflow: 'auto'}} >
        <List>
          {rows}
        </List>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    threads: state.threads
  };
}

export default connect(mapStateToProps)(ListOfThread);