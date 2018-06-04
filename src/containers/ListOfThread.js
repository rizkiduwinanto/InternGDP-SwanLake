import React from 'react';
import { List } from '@material-ui/core';
import {connect} from 'react-redux'
import Thread from './Thread';

class ListOfThread extends React.Component {
  render() {
    const rows = this.props.threads.map((thread) =>
      <Thread thread = {thread} key = {thread.id}/>
    );

    return (
      <List style={{maxHeight: 500, overflow: 'auto'}} >
        {rows}
      </List>
    );
  }
}

function mapStateToProps(state) {
  return {
    threads: state.threads
  };
}

export default connect(mapStateToProps)(ListOfThread);