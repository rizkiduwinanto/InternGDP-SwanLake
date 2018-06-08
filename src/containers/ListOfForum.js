import React from 'react';
import { List, Paper } from '@material-ui/core';
import {connect} from 'react-redux'
import Forum from './Forum';

class ListOfForum extends React.Component {
  render() {
    const rows = this.props.threads.map((thread) =>
      <Forum thread = {thread} key = {thread.id}/>
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

function mapStateToProps(state){
  return {
    forum_list : state.frequent.forumList
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchForumList: () => dispatch(fetchForumList()),
    updateForum: (id, name) => dispatch(updateForum(id, name))
  };
}

export default connect(mapStateToProps)(ListOfForum);