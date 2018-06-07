import React from 'react';
import { Table, Typography, Paper } from '@material-ui/core';
import ListFrequentGlobal from '../containers/ListFrequentGlobal';
import FrequentGlobalHead from './FrequentGlobalHead';
import DatePicker from 'react-date-picker';
import { updateSinceFrequentGlobal, updateUntilFrequentGlobal } from '../actions/frequentGlobalAction';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class FrequentGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: new Date(),
      until: new Date()
    };
    this.handleSince = this.handleSince.bind(this);
    this.handleUntil = this.handleUntil.bind(this);
  }

  handleSince(since) {
    this.setState({ since : since });
    this.props.updateSinceFrequentGlobal(since);
  }

  handleUntil(until) {
    this.setState({ until : until });
    this.props.updateUntilFrequentGlobal(until);
  }

  render(){
    return (
      <Paper>
        <Typography variant="title" >Frequent Global</Typography>
        <DatePicker onChange={this.handleSince} value={this.state.since}/>
        <DatePicker onChange={this.handleUntil} value={this.state.until}/>
        <Table>
          <FrequentGlobalHead />
          <ListFrequentGlobal />
        </Table>
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateSinceFrequentGlobal: updateSinceFrequentGlobal, updateUntilFrequentGlobal: updateUntilFrequentGlobal}, dispatch);
}

export default connect(null, mapDispatchToProps)(FrequentGlobal);