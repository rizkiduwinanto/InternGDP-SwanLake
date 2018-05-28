import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './Navbar';
import Main from './Main'

class App extends React.Component {
  render() {
    return (
      <body>
        <Navbar />
        <Main />
      </body>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
