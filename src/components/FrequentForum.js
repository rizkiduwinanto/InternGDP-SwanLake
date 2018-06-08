import React from 'react';
import { Table, Typography, Paper } from '@material-ui/core';
import ListFrequentForum from '../containers/ListFrequentForum';
import FrequentForumHead from './FrequentForumHead';

class FrequentForum extends React.Component {
  render(){
    return (
      <Paper>
        <Typography variant="title" >Frequent Forum</Typography>
        <Table>
          <FrequentForumHead />
          <ListFrequentForum />
        </Table>
      </Paper>
    );
  }
}

export default FrequentForum;