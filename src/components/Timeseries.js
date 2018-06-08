import React from 'react';
import { AreaChart } from 'react-charts-d3';
import DatePicker from 'react-date-picker'
import { Paper, Button, Typography, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchTimeseries } from '../actions/timeseriesAction';

class Timeseries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: new Date(),
      until: new Date(),
      word: '',
      data: [],
      isLoaded: false
    };
    this.handleSince = this.handleSince.bind(this);
    this.handleUntil = this.handleUntil.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateWord = this.updateWord.bind(this);
  }

  handleSince(since) {
    this.setState({ since : since });
  }

  handleUntil(until) {
    this.setState({ until : until });
  }

  handleChange() {
    console.log(this.state.word);
    if ((this.state.word !== '') && (this.state.word != null)) {
      this.props.fetchTimeseries(this.state.since, this.state.until, this.state.word);
    }
  }

  updateWord(event) {
    this.setState({word : event.target.value});
  }

  render(){
    var areachart = <div></div>;
    if(this.props.data != null) {
      var data = this.props.data.map((trend) => {
        return {
          x: trend.date,
          y: trend.counted_word
        }
      });

      var dataChart = [{
        key : this.state.word,
        values : data
      }];

      areachart = <AreaChart data={dataChart} showLegend={false} drawScatterPointers={false}/>
    }

    return(
      <Paper>
        <Typography variant="title" >Graph Timeseries</Typography>
        <DatePicker onChange={this.handleSince} value={this.state.since}/>
        <DatePicker onChange={this.handleUntil} value={this.state.until}/>
        <Input placeholder="Type Here" label="Words" value={this.state.word} onChange={this.updateWord}/>
        <Button color="primary" onClick={this.handleChange}>Show!</Button>
        {areachart}
      </Paper>
    );
  }
}

function mapStateToProps(state){
  return {
    data: state.timeseries.state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTimeseries: (since, until, word) => dispatch(fetchTimeseries(since, until, word))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeseries);