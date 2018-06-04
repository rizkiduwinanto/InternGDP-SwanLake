import React from 'react';
import Navbar from './Navbar';
// import Dashboard from './Dashboard';
import Frequent from './Frequent';

class App extends React.Component {
  render () {
    return(
      <div>
        <Navbar />
        <Frequent />
      </div>
    );
  }
}

export default App;