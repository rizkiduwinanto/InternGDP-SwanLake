import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import selectPost from '../actions/threadAction'

class Thread extends React.Component {
  render() {
    const thread = this.props.thread;

    return (
    <a className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h6 className="mb-1"><strong>{thread.title}</strong> <span className="badge badge-primary">New</span></h6>
      </div>
      <small>{thread.post_username}</small>
    </a>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectPost: selectPost}, dispatch);
}

export default connect(null, mapDispatchToProps)(Thread);