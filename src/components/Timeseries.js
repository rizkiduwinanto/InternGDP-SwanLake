import React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import _ from 'lodash';
import 'react-day-picker/lib/style.css';
import { Paper, Button, Typography, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchTimeseries } from '../actions/timeseriesAction';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Spinner from './Spinner';

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

class Timeseries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: new Date(),
      until: new Date(),
      word: '',
      data: [],
      loading: false
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
    const { since, until, word } = this.state;
    console.log(word);
    this.setState({ loading: true });
    if ((word !== '') && (word != null)) {
      this.props.fetchTimeseries(since, until, word);
    }
  }

  updateWord(event) {
    this.setState({word : event.target.value});
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render(){
    let emptyStyle = {
      textAlign: 'center',
      padding: '10px'
    };

    // var areachart = <LineChart xtitle="Size" ytitle="Population"  data={{"2017-05-13": 2, "2017-05-14": 5,"2017-05-15": 2, "2017-05-16": 5,"2017-05-17": 2, "2017-05-18": 5,}} />;
    let areachart = <h3 style={emptyStyle}> Please insert keywords </h3>
    if (this.state.loading){
      areachart = 
      <div className="my-5">
        <Spinner />
      </div>;
    }
    else if(this.props.data != null) {
      var data =  _.transform(this.props.data, (result, e) => {
        result[e.date] = e.counted_word
      }, {});
      
      if (this.props.data.length === 0){
        areachart = <h3 style={emptyStyle}> No data for that periods </h3>
      } else {
        areachart = <LineChart data={data}  xtitle="Date" ytitle="Word Count"  />;
      }

    }

    return(
      <div>
        <Typography className="text-center py-3" variant="title" >Graph Timeseries</Typography>
        <DatePicker label='Start Date' handleChange={this.handleSince} date={this.state.since} />
        <DatePicker label='End Date' handleChange={this.handleUntil} date={this.state.until} />

        <div className="text-center">

          <Input placeholder="Insert keyword" label="Words" value={this.state.word} onChange={this.updateWord}/>
          <br />
          <Button classcolor="primary" onClick={this.handleChange}>Show!</Button>
        </div>
        <br />
        {areachart}
      </div>
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