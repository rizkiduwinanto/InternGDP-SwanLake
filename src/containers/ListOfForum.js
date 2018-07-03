import React from 'react';
import { connect } from 'react-redux'
import Forum from './Forum';
import { fetchForumList } from '../actions/forumAction';
import { Typography } from '@material-ui/core';

class ListOfForum extends React.Component {
  componentDidMount() {
    this.props.fetchForumList();
  }

  render() {
    const rows = [];
    if (this.props.forum_list.data != null) {
      this.props.forum_list.data.forEach((forum) => {
        rows.push(
          <Forum forum = {forum} key = {forum.forum_id}/>);
      });
    }

    return (
      <div style={{maxHeight: '90vh', overflow: 'auto'}} >
        <div className="list-group">
          {rows}
        </div>
      </div>
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