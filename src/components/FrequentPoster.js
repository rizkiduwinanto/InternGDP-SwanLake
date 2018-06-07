import React from 'react';
import FrequentForum from './FrequentForum';
import FrequentPerForum from './FrequentPerForum';
import FrequentGlobal from './FrequentGlobal';

class FrequentPoster extends React.Component {
  render() {
    return (
      <div>
        <FrequentGlobal/>
        <FrequentForum/>
        <FrequentPerForum/>
      </div>
    );
  }
}

export default FrequentPoster;