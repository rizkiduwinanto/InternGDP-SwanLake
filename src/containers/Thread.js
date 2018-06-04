import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import selectPost from '../actions/threadAction'

class Thread extends React.Component {
  render() {
    const thread = this.props.thread;

    return (
    <ListItem button onClick={() => this.props.selectPost(thread)} divider>
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