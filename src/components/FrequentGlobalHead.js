import React from 'react';

class FrequentGlobalHead extends React.Component {
  render(){
    return (
      <thead className="thead-dark">
        <tr>
          <th>Post Username</th>
          <th>Count</th>
        </tr>
      </thead>
    );
  }
}

export default FrequentGlobalHead;