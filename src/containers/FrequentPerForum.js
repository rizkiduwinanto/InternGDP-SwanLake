import React from 'react';
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import axios from 'axios';

class FrequentPerForum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      data: []
    }
  }

  componentDidMount() {
    let url = 'http://localhost:3001/api/frequent-poster/forum/2018-05-27';
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
    const rows = this.state.data.map(freqForum => 
      <TableRow key={freqForum.forum_id}>
        <TableCell>{freqForum.forum_name}</TableCell>
        <TableCell>{freqForum.post_username}</TableCell>
        <TableCell>{freqForum.thread_count}</TableCell>
      </TableRow>
    );

    return (
      <TableBody>
        {rows}
      </TableBody>
    );
  }
}

export default FrequentPerForum;