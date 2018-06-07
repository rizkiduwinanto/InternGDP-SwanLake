import React from 'react';
import { TableCell, TableRow, TableBody, IconButton, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchForumList, updateForum } from '../actions/frequentPerForumAction';

class ListFrequentForum extends React.Component {
  constructor(props) {
    super(props);
    this.handleForum = this.handleForum.bind(this);
  }

  handleForum(id, name) {
    this.props.updateForum(id, name);
  }

  componentDidMount() {
    this.props.fetchForumList();
  }

  render() {
    const rows = [];
    if (this.props.forum_list.data != null) {
      this.props.forum_list.data.forEach((forum) => {
        rows.push(
          <TableRow key={forum.forum_id}>
            <TableCell>{forum.forum_name}</TableCell>
            <TableCell>{forum.description}</TableCell>
            <TableCell><IconButton onClick={this.handleForum.bind(this, forum.forum_id, forum.forum_name)}><Icon>arrow_right_alt</Icon></IconButton></TableCell>
          </TableRow>);
      });
    }

    return (
      <TableBody>
        {rows}
      </TableBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListFrequentForum);