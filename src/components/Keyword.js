import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';

const textFieldStyle = {
  marginLeft : 22
}

const inlineTextStyle = {
  marginTop : 20
}

const tableStyle = {
  margin: '0 auto',
  marginTop: '20px',
  width: '50%'
}

class Keyword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword : '',
      interval : 0
    };
  }

  renderTableKeyword() {
    const getData = () => {
       let rows = ( <tr key={1}>
          <td>Rizki</td>
          <td>1</td>
          <td><a href="#">Edit</a> <a href="#">Delete</a></td>
        </tr>);
      return rows;
    }

    return (
      <div>
        <table className="table table-bordered centerTable" style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th>Keyword</th>
              <th>Interval</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getData()}
          </tbody>
        </table>
      </div>
    );
  }
  
  render(){
    return(
      <div>
        <Typography className="text-center py-3" variant="display1" >Keyword</Typography>
        <div className="text-center">
          <TextField style={textFieldStyle} placeholder="Insert new Keyword here" label="Keyword"/>
          <TextField style={textFieldStyle} placeholder="Interval" label="Interval"/>
          <Button color="primary" >Register Keyword</Button>
          {this.renderTableKeyword()}
          <div style={inlineTextStyle}>
            <h5>Email to : rizkiduwinanto@gmail.com <a href="#">Edit</a></h5>
          </div>
        </div>
        <Typography className="text-center py-3" variant="title" >History</Typography>
        <div className="text-center">
          <ul className="list-group mx-auto justify-content-center" style={{maxWidth:'50%'}}>
            <li className="list-group-item" >Test</li>
            <li className="list-group-item" >Test</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Keyword;