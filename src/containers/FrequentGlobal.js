import React from 'react';
import { Table, Typography, Paper, Button } from '@material-ui/core';
import ListFrequentGlobal from './ListFrequentGlobal';
import FrequentGlobalHead from '../components/FrequentGlobalHead';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { updateFrequentGlobal } from '../actions/frequentGlobalAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FrequentNavTabs from '../components/FrequentNavTabs';

const DatePicker = (props) => {
  return (
    <div className="text-center py-3">
          <div className="d-block">
            <span className="d-inline-block pr-3">{props.label}</span>
            <span className="text-center">
            <DayPickerInput onDayChange={props.handleChange} value={props.date}/>
            </span>
            <span role="img" aria-label="calendar-emoji" style={{fontSize: '25px'}} className="d-inline-block pl-3"> 📅 </span>
          </div>
        </div>
  );
}

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
        <FrequentNavTabs/>
        <Typography className="text-center py-3" variant="title" >Frequent Global</Typography>
        <DatePicker label='Start Date' handleChange={this.handleSince} date={this.state.since} />
        <DatePicker label='End Date' handleChange={this.handleUntil} date={this.state.until} />
        <div className="text-center">
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