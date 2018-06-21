import React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import _ from 'lodash';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
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
    console.log(since);
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
    let emptyStyle = {
      textAlign: 'center',
      padding: '10px'
    };

    // var areachart = <LineChart xtitle="Size" ytitle="Population"  data={{"2017-05-13": 2, "2017-05-14": 5,"2017-05-15": 2, "2017-05-16": 5,"2017-05-17": 2, "2017-05-18": 5,}} />;
    var areachart = <h3 style={emptyStyle}> Please insert keywords </h3>
    if(this.props.data != null) {
      var data =  _.transform(this.props.data, (result, e) => {
        result[e.date] = e.counted_word
      }, {});
      
      if (this.props.data.length === 0){
        areachart = <h3 style={emptyStyle}> Empty </h3>
      } else {
        areachart = <LineChart xtitle="Size" ytitle="Population" data={data}  xtitle="Date" ytitle="Word Count"  />;
      }

      
      

      var dataChart = [{
        key : this.state.word,
        values : data
      }];

    }

    return(
      <Paper>
        <Typography variant="title" >Graph Timeseries</Typography>
        <DayPickerInput onDayChange={this.handleSince} value={this.state.since}/>
        <DayPickerInput onDayChange={this.handleUntil} value={this.state.until}/>
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

ReactChartkick.addAdapter(Chart)
export default connect(mapStateToProps, mapDispatchToProps)(Timeseries);