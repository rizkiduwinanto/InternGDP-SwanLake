import React from 'react';
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import axios from 'axios';

class FrequentGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      data: []
    }
  }

  componentDidMount() {
    let url = 'http://localhost:3001/api/frequent-poster/global/2018-05-27';
    axios
      .get(url)
      .then(res => {
        this.setState({ 
          success: res.data.success,
          data : res.data.data
        });    
      })
      .catch((err)=>{console.log(err)});
  }

  render() {
    const rows = this.state.data.map(freqGlobal => 
      <TableRow key={freqGlobal.post_username}>
        <TableCell>{freqGlobal.post_username}</TableCell>
        <TableCell>{freqGlobal.thread_count}</TableCell>
      </TableRow>
    );

    return (
      <TableBody>
        {rows}
      </TableBody>
    );
  }
}

export default FrequentGlobal;