import React from 'react';
import { Typography, Button, TextField, Grid } from '@material-ui/core';
import 'react-day-picker/lib/style.css';
import { fetchFrequentGlobal } from '../actions/frequentGlobalAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FrequentNavTabs from '../components/FrequentNavTabs';
import DatePicker from '../components/DatePicker';
import Spinner from '../components/Spinner';

const tableStyle = {
  margin: '0 auto',
  width: '90%'
}

class FrequentGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: new Date(),
      until: new Date(),
      limit: 0,
      loading: false
    };
    this.handleSince = this.handleSince.bind(this);
    this.handleUntil = this.handleUntil.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
  }

  handleLimit(event){
    this.setState({limit : event.target.value});
  }

  handleSince(since) {
    this.setState({ since : since });
  }

  handleUntil(until) {
    this.setState({ until : until });
  }

  handleChange() {
    this.setState({ loading: true });
    this.props.fetchFrequentGlobal(this.state.since, this.state.until, this.state.limit);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  renderTable() {
    const getData = () => {
      if (this.state.loading || this.props.data.data == null){
        return;
      }
      if (this.props.data.data.length === 0){
        return (
          <tr>
            <td>{"No data found for this period"}</td>
          </tr>
        );
      }
      let rows = this.props.data.data.map((freqGlobal, i) => 
        <tr key={i}>
          <td>{freqGlobal.post_username}</td>
          <td>{freqGlobal.post_count}</td>
        </tr>
      );
      return rows;
    }

    const showSpinnerWhenLoading = () => (this.state.loading) ? <Spinner /> : "";
    
    return(
      <div>
        <table className="table table-bordered centerTable" style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th>Post Username</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {getData()}
          </tbody>
        </table>
        {showSpinnerWhenLoading()}
      </div>
    );
  }

  render(){
    return (
      <div>
        <FrequentNavTabs selectedTab='global' />
        <Typography className="text-center py-3" variant="display2" >Frequent Global</Typography>
        <Grid container>
          <Grid item xs={6}>
            <DatePicker label='Start Date' handleChange={this.handleSince} date={this.state.since} />
            <DatePicker label='End Date' handleChange={this.handleUntil} date={this.state.until} />
            <div className="text-center">
              <TextField type="number" label="Limit" placeholder="Insert Limit" onChange={this.handleLimit}/>
              <br/>
              <Button color="primary" onClick={this.handleChange}>Show!</Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="text-center align-center">
              {this.renderTable()}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToDispatch(dispatch) {
  return bindActionCreators({fetchFrequentGlobal: fetchFrequentGlobal}, dispatch);
}

function mapStateToProps(state){
  // console.log(state);
  return {
    since : state.frequent.since_global,
    until : state.frequent.until_global,
    data : state.frequent.frequentGlobal,
    limit : state.frequent.limit_global
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(FrequentGlobal);