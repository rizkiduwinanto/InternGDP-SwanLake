import React from 'react';
import { Table, Typography, Paper } from '@material-ui/core';
import ListFrequentGlobal from '../containers/ListFrequentGlobal';
import FrequentGlobalHead from './FrequentGlobalHead';
import DatePicker from 'react-date-picker'

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
  }

  handleUntil(until) {
    this.setState({ until : until });
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

export default FrequentGlobal;