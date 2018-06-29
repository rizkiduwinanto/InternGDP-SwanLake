import React from 'react';
import ReactLoading from 'react-loading';
import { Paper, Button, Typography, TextField } from '@material-ui/core';
import WordCloud from 'react-d3-cloud'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { fetchWordcloud } from '../actions/wordcloudAction';


const DatePicker = (props) => {
  return (
    <div className="text-center py-3">
          <div className="d-block">
            <span className="d-inline-block pr-3"> {props.label}</span>
            <span className="text-center">
            <DayPickerInput onDayChange={props.handleChange} value={props.date}/>
            </span>
            <span role="img" aria-label="calendar-emoji" style={{fontSize: '25px'}} className="d-inline-block pl-3"> 📅 </span>
          </div>
        </div>
  );
}

class WordcloudPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: new Date(),
      until: new Date(),
      limit: 15,
      loading: false
    };
    this.handleSince = this.handleSince.bind(this);
    this.handleUntil = this.handleUntil.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
  }

  handleSince(since) {
    console.log(since);
    this.setState({ since : since });
  }

  handleUntil(until) {
    this.setState({ until : until });
  }

  handleChange() {
    console.log(this.state.since);
    console.log(this.state.until);

    this.setState({ loading: true });
    this.props.fetchWordcloud(this.state.since, this.state.until, this.state.limit);
  }

  handleLimit(event) {
    this.setState({ limit : event.target.value });
  }

  fontSizeMapper(text) {
    return  text.value * 70  ;
  }

  rotate(text) {
    return text.value % 360;
  }

  
  componentWillReceiveProps(){
    this.setState({ loading: false});
  }

  render(){
    var wordcloud = <div></div>;

    if(this.state.loading){
      let type='bubbles';
      let color='rgb(63, 81, 181)';
      wordcloud = 
      <div className="my-5">
        <ReactLoading className="mx-auto" type={type} color={color} height={300} width={150} />
      </div>;
    }
    else if (this.props.data != null) {

      if (this.props.data.length == 0){
        wordcloud = <h3> Empty </h3>
      } else {
          let max = this.props.data.reduce((max, e) => e.value > max ? e.value : max, this.props.data[0].value);
          const resizedDataValue = this.props.data.map(e => {
            let newE = Object.assign({}, e);
            newE.value /= max;
            return newE;
          });
          const top5 = this.props.data.slice(0,5).map(e => {
            return (
              <tr key={e.text} >
              <td>{e.text}</td>
              <td>{e.value}</td>
            </tr>
          );
        })
        wordcloud = (
          <div className="row mx-3">
            <div className="col-sm-8">
              <WordCloud data={resizedDataValue} fontSizeMapper={this.fontSizeMapper}/>
            </div>
            <div className="col-sm-4 my-auto text-center">
              <h3 >Top 5 Words 🏆</h3>
              <table className="table">
                <tbody>
                  {top5}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

    }

    return(
      <div>
        <Typography className="text-center py-3" variant="title" >WordCloud</Typography>
        <DatePicker label='Start Date' handleChange={this.handleSince} date={this.state.since} />
        <DatePicker label='End Date' handleChange={this.handleUntil} date={this.state.until} />

        <div className="text-center">
          <TextField type="number" label="Limit" placeholder="Insert Limit" onChange={this.handleLimit}/>
          <br className="my-3" />
          <Button color="primary" onClick={this.handleChange}>Show!</Button>
        </div>
        {wordcloud}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    data: state.wordcloud.state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWordcloud: (since, until, limit) => dispatch(fetchWordcloud(since, until, limit))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordcloudPage);