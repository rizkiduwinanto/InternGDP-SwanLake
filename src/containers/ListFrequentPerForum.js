import React from 'react';
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchFrequentPerForum } from '../actions/frequentPerForumAction';

class ListFrequentPerForum extends React.Component {
  componentDidUpdate(prevProps){
    if ((prevProps.since !== this.props.since) || (prevProps.until !== this.props.until) || (prevProps.forum_id !== this.props.forum_id)) {
      this.props.fetchFrequentPerForum(this.props.since, this.props.until, this.props.forum_id);
    }
  }

  render() {
    const rows = [];
    if (this.props.frequent_perforum.data != null) {
      this.props.frequent_perforum.data.forEach((poster, i) => {
        rows.push(
          <TableRow key={i}>
            <TableCell>{poster.post_username}</TableCell>
            <TableCell>{poster.post_count}</TableCell>
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

function mapStateToDispatch(state){
  return {
    since : state.frequent.since_perforum,
    until : state.frequent.until_perforum,
    forum_id : state.frequent.id,
    forum_name : state.frequent.name,
    frequent_perforum : state.frequent.frequentPerForum
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchFrequentPerForum: (since, until, forum_id) => dispatch(fetchFrequentPerForum(since, until, forum_id))
  };
}

export default connect(mapStateToDispatch, mapDispatchToProps)(ListFrequentPerForum);