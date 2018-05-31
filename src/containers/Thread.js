import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import selectPost from '../actions'
import { ListItem, ListItemText } from '@material-ui/core';

class Thread extends React.Component {
  render() {
    const thread = this.props.thread;

    return (
    <ListItem button onClick={() => this.props.selectPost(thread.id)} divider>
      <ListItemText
      primary = {thread.title}
      secondary = {thread.post_username}
      />
    </ListItem>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectPost: selectPost}, dispatch);
}

export default connect(null, mapDispatchToProps)(Thread);