import React from 'react';
import { Typography, Button, TextField, Grid } from '@material-ui/core';
import ListFrequentGlobal from './ListFrequentGlobal';
import FrequentGlobalHead from '../components/FrequentGlobalHead';
import 'react-day-picker/lib/style.css';
import { updateFrequentGlobal } from '../actions/frequentGlobalAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FrequentNavTabs from '../components/FrequentNavTabs';
import DatePicker from '../components/DatePicker';

const tableStyle = {
  margin: '0 auto',
  width: '90%'
}

class FrequentGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: new Date(),
      until: new Date(),
      limit: 0
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
    this.props.updateFrequentGlobal(this.state.since, this.state.until, this.state.limit);
  }

  render(){
    return (
      <div>
        <FrequentNavTabs/>
        <Typography className="text-center py-3" variant="display2" >Frequent Global</Typography>
        <Grid container>
          <Grid item xs={6}>
            <DatePicker label='Start Date' handleChange={this.handleSince} date={this.state.since} />
            <DatePicker label='End Date' handleChange={this.handleUntil} date={this.state.until} />
            <div className="text-center">
              <TextField type="number" label="Limit" placeholder="Insert Limit" onChange={this.handleLimit}/>
              <br/>
              <Button color="primary" onClick={this.handleChange}>Show!</Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="text-center align-center">
              <table className="table table-bordered centerTable" style={tableStyle}>
                <FrequentGlobalHead />
                <ListFrequentGlobal />
              </table>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateFrequentGlobal: updateFrequentGlobal}, dispatch);
}

export default connect(null, mapDispatchToProps)(FrequentGlobal);