import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import KeywordTable from './KeywordTable';
import KeywordEmail from './KeywordEmail';
import KeywordHistory from './KeywordHistory';

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
    if (this.state.interval < 1 && this.state.keyword){
      fetch('http://127.0.0.1:3001/api/mail_keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword: this.state.keyword,
          interval: this.state.interval
        })
      });
      this.setState({keyword: '', interval: 0});
    } else {
      alert('Interval cannot be a minus or Keyword cannot be a null!');
    }
  }
  
  render(){
    return(
      <div>
        <Typography className="text-center py-3" variant="display1" >Keyword</Typography>
        <div className="text-center">
          <form onSubmit={(e)=>{this.insertKeyword();}}>
            <TextField style={textFieldStyle} type="text" placeholder="Insert new Keyword here" label="Keyword" onChange={this.onChangeKeyword}/>
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


export default Keyword;