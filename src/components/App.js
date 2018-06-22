import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import FrequentPoster from './FrequentPoster';
import Timeseries from './Timeseries';
import WordcloudPage from './Wordcloud';
import About from './About';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    const socket = io.connect('http://35.231.65.98:3001');
    console.dir(socket);
  }

  render () {
    return(
      <Router>
        <div>
          <Navbar/>
          <div className="container">
          <Route exact path='/' component={Dashboard}/>
          <Route path='/FrequentPoster' component={FrequentPoster}/>
          <Route path='/Timeseries' component={Timeseries}/>
          <Route path='/Wordcloud' component={WordcloudPage}/>
          <Route path='/About' component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;