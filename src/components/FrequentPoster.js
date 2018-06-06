import React from 'react';
import { Table, Paper, Typography} from '@material-ui/core';
import FrequentGlobal from '../containers/FrequentGlobal';
import FrequentPerForum from '../containers/FrequentPerForum';
import FrequentGlobalHead from './FrequentGlobalHead';
import FrequentPerForumHead from './FrequentPerForumHead';

class FrequentPoster extends React.Component {
  render() {
    return (
      <div>
        <Paper>
          <Typography variant="title" >Frequent Global</Typography>
          <Table style={{ tableLayout: 'auto' }} fixedHeader={false}>
            <FrequentGlobalHead />
            <FrequentGlobal />
          </Table>
          <Typography variant="title" >Frequent Forum</Typography>
          <Table style={{ tableLayout: 'auto' }} fixedHeader={false}>
            <FrequentPerForumHead />
            <FrequentPerForum/>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default FrequentPoster;