import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Timeseries from './Timeseries';
import WordcloudPage from './Wordcloud';
import About from './About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FrequentPerForum from '../containers/FrequentPerForum';
import FrequentGlobal from '../containers/FrequentGlobal';

class App extends React.Component {
  render () {
    return(
      <Router>
        <div>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/FrequentPoster/Global' component={FrequentGlobal}/>
            <Route path='/FrequentPoster/Perforum' component={FrequentPerForum}/>
            <Route path='/Timeseries' component={Timeseries}/>
            <Route path='/Wordcloud' component={WordcloudPage}/>
            <Route path='/About' component={About}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;