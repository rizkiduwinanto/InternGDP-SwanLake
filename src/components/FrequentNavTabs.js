import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  }
}

class FrequentNavTabs extends React.Component {
  state = {
    selectedTab: 'global'
  };

  handleChange = (event, value) => {
    this.setState({selectedTab: value});
  }
  
  render() {
    return (
      <div style={styles.root}>
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered>
          <Tab value="global" label="Frequent Global" component={Link} to="/FrequentPoster/Global"/>
          <Tab value="perforum" label="Frequent Poster Perforum" component={Link} to="/FrequentPoster/Perforum" />
        </Tabs>
      </div>
    );
  }
  }

export default FrequentNavTabs;