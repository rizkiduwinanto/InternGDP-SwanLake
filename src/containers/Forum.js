import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectThread } from '../actions/forumAction';

class Forum extends React.Component {
  render() {
    const forum = this.props.forum;

    return (
    <ListItem button onClick={() => this.props.selectThread(forum)} divider>
      <ListItemText
      primary = {forum.forum_name}
      secondary = {forum.description}
      />
    </ListItem>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    selectThread : (forum) => dispatch(selectThread(forum))
  }; 
}

export default connect(null, mapDispatchToProps)(Forum);