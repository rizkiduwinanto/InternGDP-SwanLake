import React from 'react';
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchFrequentGlobal } from '../actions/frequentGlobalAction';

class ListFrequentGlobal extends React.Component {
  componentDidMount() {
    this.props.fetchFrequentGlobal(this.props.since, this.props.until);
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.since !== this.props.since) || (prevProps.until !== this.props.until)) {
      this.props.fetchFrequentGlobal(this.props.since, this.props.until);
    }
  }

  render() {
    var rows = <TableRow><TableCell></TableCell></TableRow>;

    if (this.props.data.data != null) {
      rows = this.props.data.data.map(freqGlobal => 
        <TableRow key={freqGlobal.post_username}>
          <TableCell>{freqGlobal.post_username}</TableCell>
          <TableCell>{freqGlobal.post_count}</TableCell>
        </TableRow>
      );
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
    since : state.frequent.since_global,
    until : state.frequent.until_global,
    data : state.frequent.frequentGlobal
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchFrequentGlobal: (since, until) => dispatch(fetchFrequentGlobal(since, until))
  };
}

export default connect(mapStateToDispatch, mapDispatchToProps)(ListFrequentGlobal);