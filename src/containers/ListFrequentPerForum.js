import React from 'react';
import { connect } from 'react-redux';
import { fetchFrequentPerForum } from '../actions/frequentPerForumAction';

class ListFrequentPerForum extends React.Component {
  componentDidUpdate(prevProps){
    if ((prevProps.since !== this.props.since) || (prevProps.until !== this.props.until) || (prevProps.forum.forum_id !== this.props.forum.forum_id)) {
      this.props.fetchFrequentPerForum(this.props.since, this.props.until, this.props.limit, this.props.forum.forum_id);
    }
  }

  render() {
    const rows = [];
    if (this.props.frequent_perforum.data != null) {
      this.props.frequent_perforum.data.forEach((poster, i) => {
        rows.push(
          <tr key={i}>
            <td>{poster.post_username}</td>
            <td>{poster.post_count}</td>
          </tr>);
      });
    }

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
}

function mapStateToDispatch(state){
  return {
    since : state.frequent.since_perforum,
    until : state.frequent.until_perforum,
    forum : state.frequent.forum,
    frequent_perforum : state.frequent.frequentPerForum,
    limit : state.frequent.limit_perforum
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchFrequentPerForum: (since, until, limit, forum_id) => dispatch(fetchFrequentPerForum(since, until, limit, forum_id))
  };
}

export default connect(mapStateToDispatch, mapDispatchToProps)(ListFrequentPerForum);