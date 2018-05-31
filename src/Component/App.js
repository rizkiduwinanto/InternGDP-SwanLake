import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard'

class App extends React.Component {
  render () {
    return(
      <body>
        <Navbar />
        <Dashboard />
      </body>
    );
  }
}

export default App;