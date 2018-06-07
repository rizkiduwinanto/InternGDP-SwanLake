import React from 'react';
import { Table, Typography, Paper } from '@material-ui/core';
import ListFrequentPerForum from '../containers/ListFrequentPerForum';
import FrequentPerForumHead from './FrequentPerForumHead';
import DatePicker from 'react-date-picker'

class FrequentPerForum extends React.Component {
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
        <Typography variant="title" >Frequent Forum</Typography>
        <DatePicker onChange={this.handleSince} value={this.state.since}/>
        <DatePicker onChange={this.handleUntil} value={this.state.until}/>
        <Table>
          <FrequentPerForumHead />
          <ListFrequentPerForum />
        </Table>
      </Paper>
    );
  }
}

export default FrequentPerForum;