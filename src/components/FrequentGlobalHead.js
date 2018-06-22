import React from 'react';
import { TableRow, TableHead, Typography } from '@material-ui/core';
import CustomTableCell from './CustomTableCell';

class FrequentGlobalHead extends React.Component {
  render(){
    return (
      <TableHead>
        <TableRow>
          <CustomTableCell><Typography>Post Username</Typography></CustomTableCell>
          <CustomTableCell><Typography>Count</Typography></CustomTableCell>
        </TableRow>
      </TableHead>
    );
  }
}

export default FrequentGlobalHead;