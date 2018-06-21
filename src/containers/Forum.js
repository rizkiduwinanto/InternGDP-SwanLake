import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import selectPost from '../actions/threadAction'

class Forum extends React.Component {
  render() {
    const forum = this.props.forum;

    return (
    <ListItem button divider key={forum.id}>
      <ListItemText
      primary = {forum.forum_name}
      secondary = {forum.description}
      />
    </ListItem>
    );
  }
}


export default Forum;