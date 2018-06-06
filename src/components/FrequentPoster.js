import React from 'react';
import FrequentPerForum from './FrequentPerForum';
import FrequentGlobal from './FrequentGlobal';

class FrequentPoster extends React.Component {
  render() {
    return (
      <div>
        <FrequentGlobal/>
        <FrequentPerForum/>
      </div>
    );
  }
}

export default FrequentPoster;