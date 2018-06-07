import React from 'react';
import { Table, Typography, Paper, Button } from '@material-ui/core';
import ListFrequentGlobal from '../containers/ListFrequentGlobal';
import FrequentGlobalHead from './FrequentGlobalHead';
import DatePicker from 'react-date-picker';
import { updateFrequentGlobal } from '../actions/frequentGlobalAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class FrequentGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: new Date(),
      until: new Date()
    };
    this.handleSince = this.handleSince.bind(this);
    this.handleUntil = this.handleUntil.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSince(since) {
    this.setState({ since : since });
  }

  handleUntil(until) {
    this.setState({ until : until });
  }

  handleChange() {
    this.props.updateFrequentGlobal(this.state.since, this.state.until);
  }

  render(){
    return (
      <Paper>
        <Typography variant="title" >Frequent Global</Typography>
        <DatePicker onChange={this.handleSince} value={this.state.since}/>
        <DatePicker onChange={this.handleUntil} value={this.state.until}/>
        <Button color="primary" onClick={this.handleChange}>Show!</Button>
        <Table>
          <FrequentGlobalHead />
          <ListFrequentGlobal />
        </Table>
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateFrequentGlobal: updateFrequentGlobal}, dispatch);
}

export default connect(null, mapDispatchToProps)(FrequentGlobal);