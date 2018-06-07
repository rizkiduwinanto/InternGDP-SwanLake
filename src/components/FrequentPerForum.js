import React from 'react';
import { Table, Typography, Paper, Button } from '@material-ui/core';
import ListFrequentPerForum from '../containers/ListFrequentPerForum';
import FrequentPerForumHead from './FrequentPerForumHead';
import DatePicker from 'react-date-picker'
import { updateFrequentPerForum } from '../actions/frequentPerForumAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class FrequentPerForum extends React.Component {
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
    this.props.updateFrequentPerForum(this.state.since, this.state.until);
  }

  render(){
    return (
      <Paper>
        <Typography variant="title" >{this.props.forum_name}</Typography>
        <DatePicker onChange={this.handleSince} value={this.state.since}/>
        <DatePicker onChange={this.handleUntil} value={this.state.until}/>
        <Button color="primary" onClick={this.handleChange}>Show!</Button>
        <Table>
          <FrequentPerForumHead />
          <ListFrequentPerForum />
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps(state){
  return {
    forum_name: state.frequent.name
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateFrequentPerForum: updateFrequentPerForum}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FrequentPerForum);