import React from 'react';
import Navbar from './Navbar';
import Dashboard from '../containers/Dashboard';
import Timeseries from '../containers/Timeseries';
import WordcloudPage from '../containers/Wordcloud';
import Keyword from './Keyword';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FrequentPerForum from '../containers/FrequentPerForum';
import FrequentGlobal from '../containers/FrequentGlobal';
import SocketContext from '../miscellaneous/SocketContext';
import io from 'socket.io-client';
import { API_URL } from '../config';

const socket = io.connect(`${API_URL}`);

class App extends React.Component {
  render () {
    return(
      <Router>
        <SocketContext.Provider value= {socket}>
          <div>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Dashboard}/>
              <Route path='/FrequentPoster/Global' component={FrequentGlobal}/>
              <Route path='/FrequentPoster/Perforum' component={FrequentPerForum}/>
              <Route path='/Timeseries' component={Timeseries}/>
              <Route path='/Wordcloud' component={WordcloudPage}/>
              <Route path='/Keyword' component={Keyword}/>
            </Switch>
          </div>
        </SocketContext.Provider>
      </Router>
    );
  }
}

export default App;