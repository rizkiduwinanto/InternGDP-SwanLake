import React from 'react';
import { connect } from 'react-redux';
import { fetchFrequentGlobal } from '../actions/frequentGlobalAction';

class ListFrequentGlobal extends React.Component {
  componentDidUpdate(prevProps) {
    if ((prevProps.since !== this.props.since) || (prevProps.until !== this.props.until)) {
      this.props.fetchFrequentGlobal(this.props.since, this.props.until, this.props.limit);
    }
  }

  render() {
    var rows = <tr></tr>;
    if (this.props.data.data != null) {
      rows = this.props.data.data.map(freqGlobal => 
        <tr key={freqGlobal.post_username}>
          <td>{freqGlobal.post_username}</td>
          <td>{freqGlobal.post_count}</td>
        </tr>
      );
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
    since : state.frequent.since_global,
    until : state.frequent.until_global,
    data : state.frequent.frequentGlobal,
    limit : state.frequent.limit_global
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchFrequentGlobal: (since, until, limit) => dispatch(fetchFrequentGlobal(since, until, limit))
  };
}

export default connect(mapStateToDispatch, mapDispatchToProps)(ListFrequentGlobal);