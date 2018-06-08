import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import WordCloud from 'react-d3-cloud'
import DatePicker from 'react-date-picker'
import { connect } from 'react-redux';
import { fetchWordcloud } from '../actions/wordcloudAction';

class WordcloudPage extends React.Component {
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
    this.props.fetchWordcloud(this.state.since, this.state.until);
  }

  fontSizeMapper(text) {
    return Math.sqrt(text.value) / 5;
  }

  rotate(text) {
    return text.value % 360;
  }

  render(){
    var wordcloud = <div></div>;

    if (this.props.data != null) {
      wordcloud = <WordCloud data={this.props.data} fontSizeMapper={this.fontSizeMapper}/>;
    }

    return(
      <Paper>
        <Typography variant="title" >WordCloud</Typography>
        <DatePicker onChange={this.handleSince} value={this.state.since}/>
        <DatePicker onChange={this.handleUntil} value={this.state.until}/>
        <Button color="primary" onClick={this.handleChange}>Show!</Button>
        {wordcloud}
      </Paper>
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
    fetchWordcloud: (since, until) => dispatch(fetchWordcloud(since, until))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordcloudPage);