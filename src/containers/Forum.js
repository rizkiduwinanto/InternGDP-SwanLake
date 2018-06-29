import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectForum } from '../actions/forumAction';

class Forum extends React.Component {
  render() {
    const forum = this.props.forum;

    return (
      <a className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h6 className="mb-1"><strong>{forum.forum_name}</strong></h6>
        </div>
        <small>{forum.description}</small>
      </a>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    selectForum : (forum) => dispatch(selectForum(forum))
  }; 
}

export default connect(null, mapDispatchToProps)(Forum);