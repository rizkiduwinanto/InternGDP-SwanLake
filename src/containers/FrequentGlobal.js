import React from 'react';
import { Table, Typography, Paper, Button, TextField } from '@material-ui/core';
import ListFrequentGlobal from './ListFrequentGlobal';
import FrequentGlobalHead from '../components/FrequentGlobalHead';
import 'react-day-picker/lib/style.css';
import { updateFrequentGlobal } from '../actions/frequentGlobalAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FrequentNavTabs from '../components/FrequentNavTabs';
import DatePicker from '../components/DatePicker';

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
    this.handleLimit = this.handleLimit.bind(this);
  }

  handleLimit(event){
    this.setState({limit : event.target.value});
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
        <FrequentNavTabs/>
        <Typography className="text-center py-3" variant="title" >Frequent Global</Typography>
        <DatePicker label='Start Date' handleChange={this.handleSince} date={this.state.since} />
        <DatePicker label='End Date' handleChange={this.handleUntil} date={this.state.until} />
        <div className="text-center">
          <TextField type="number" label="Limit" placeholder="Insert Limit" value = {this.state.limit}/>
          <br/>
          <Button color="primary" onClick={this.handleChange}>Show!</Button>
        </div>
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