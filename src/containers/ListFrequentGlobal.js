import React from 'react';
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import axios from 'axios';
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
    console.log(this.props.data);

    var rows = <TableRow><TableCell></TableCell></TableRow>;

    if (this.props.data != null) {
      rows = this.props.data.map(freqGlobal => 
        <TableRow key={freqGlobal.post_username}>
          <TableCell>{freqGlobal.post_username}</TableCell>
          <TableCell>{freqGlobal.post_count}</TableCell>
        </TableRow>
      );
    } 
    
    console.log(this.props.since);
    console.log(this.props.until);

    return (
      <TableBody>
        {rows}
      </TableBody>
    );
  }
}

function mapStateToDispatch(state){
  return {
    since : state.requestFrequentGlobal.since,
    until : state.requestFrequentGlobal.until,
    data : state.frequentGlobal.data
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchFrequentGlobal: (since, until) => dispatch(fetchFrequentGlobal(since, until))
  };
}

export default connect(mapStateToDispatch, mapDispatchToProps)(ListFrequentGlobal);