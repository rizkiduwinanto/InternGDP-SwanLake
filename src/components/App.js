import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import FrequentPoster from './FrequentPoster';
import Timeseries from './Timeseries';
import WordcloudPage from './Wordcloud';
import About from './About';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render () {
    return(
      <Router>
        <div>
          <Navbar/>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/FrequentPoster' component={FrequentPoster}/>
          <Route path='/Timeseries' component={Timeseries}/>
          <Route path='/Wordcloud' component={WordcloudPage}/>
          <Route path='/About' component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;