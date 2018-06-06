import React from 'react';
import { TableRow, TableHead, TableCell, Typography } from '@material-ui/core';

class FrequentPerForumHead extends React.Component {
  render(){
    return (
      <TableHead>
        <TableRow>
          <TableCell><Typography>Forum Name</Typography></TableCell>
          <TableCell><Typography>Post Username</Typography></TableCell>
          <TableCell><Typography>Count</Typography></TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

export default FrequentPerForumHead;