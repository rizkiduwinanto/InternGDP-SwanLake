import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import KeywordTable from '../containers/KeywordTable';
import KeywordEmail from '../containers/KeywordEmail';
import KeywordHistory from './KeywordHistory';
import { insertKeyword } from '../actions/keywordAction';
import { connect } from 'react-redux';

const textFieldStyle = {
  marginLeft : 22
}

class Keyword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      interval: 0
    }
    this.onChangeKeyword = this.onChangeKeyword.bind(this);
    this.onChangeInterval = this.onChangeInterval.bind(this);
  }

  onChangeKeyword (event) {
    this.setState({keyword: event.target.value });
  }

  onChangeInterval (event) {
    this.setState({interval: event.target.value });
  }

  insertKeyword() {
    if (this.state.interval > 0 && this.state.keyword){
      this.props.insertKeyword(this.state.interval, this.state.keyword);
      this.setState({ keyword : '', interval : 0 });
    } else {
      alert('Interval cannot be a minus or Keyword cannot be a null!');
    }
  }
  
  render(){
    return(
      <div style={{marginBottom: '30px'}}>
        <Typography className="text-center py-3" variant="display1" >Keyword</Typography>
        <div className="text-center">
          <form onSubmit={(e) =>{
              e.preventDefault();
              this.insertKeyword();
              e.target.reset();
            }}>
            <TextField style={textFieldStyle} type="text" placeholder="Insert new Keyword here" label="Keyword" onChange={this.onChangeKeyword} value={this.state.keyword}/>
            <TextField style={textFieldStyle} type="number" placeholder="Interval" label="Interval" onChange={this.onChangeInterval}/>
            <Button color="primary" type="submit" >Register Keyword</Button>
          </form>
          <KeywordTable/>
          <KeywordEmail/>
        </div>
        <Typography className="text-center py-3" variant="title" >History</Typography>
        <div className="text-center">
          <KeywordHistory/>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    insertKeyword: (interval, keyword) => dispatch(insertKeyword(interval, keyword))
  };
}

export default connect(null, mapDispatchToProps)(Keyword);