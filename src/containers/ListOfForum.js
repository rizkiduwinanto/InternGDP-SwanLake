import React from 'react';
import { List, Paper } from '@material-ui/core';
import { connect } from 'react-redux'
import Forum from './Forum';
import { fetchForumList } from '../actions/frequentPerForumAction';

class ListOfForum extends React.Component {
  componentDidMount() {
    this.props.fetchForumList();
  }

  render() {
    const rows = [];
    if (this.props.forum_list.data != null) {
      this.props.forum_list.data.forEach((forum) => {
        rows.push(
          <Forum forum = {forum} key = {forum.id}/>);
      });
    }

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
    fetchForumList: () => dispatch(fetchForumList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfForum);