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
      loading: false,
      currentPage: 1,
      dataPerPage: 5
    };
    this.handleSince = this.handleSince.bind(this);
    this.handleUntil = this.handleUntil.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
    this.handleClick = this.handleClick.bind(this); 
    this.handlePrevious = this.handlePrevious.bind(this); 
    this.handleNext = this.handleNext.bind(this); 
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

  handleClick(id) {
    this.setState({
      currentPage: id
    });
  }

  handleNext() {
    const numberOfPageItem = Math.ceil(this.props.data.data.length/this.state.dataPerPage);
    if (this.state.currentPage < numberOfPageItem) {
      this.setState({
        currentPage: this.state.currentPage+1
      });
    }
  }

  handlePrevious() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage-1
      });
    }
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  renderTable() {
    const { currentPage, dataPerPage } = this.state;

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

      let indexLast = currentPage * dataPerPage;
      let indexFirst = indexLast - dataPerPage; 
      let currentData = this.props.data.data.slice(indexFirst, indexLast);
      let rows = currentData.map((freqGlobal, i) => 
        <tr key={i}>
          <td>{freqGlobal.post_username}</td>
          <td>{freqGlobal.post_count}</td>
        </tr>
      );
      return rows;
    }

    const getPageNumber = () => {
    
      if ((this.state.loading || this.props.data.data == null) || this.props.data.data.length <= dataPerPage){
        return;
      }
      
      let pageNumber = [];

      const numberOfPageItem = Math.ceil(this.props.data.data.length/dataPerPage);

      for (let i = 1; i <= numberOfPageItem; i++) {
        pageNumber.push(<li key={i} className="page-item"><a onClick={() => this.handleClick(i)} className="page-link">{i}</a></li>)
      }

      let pageNumberList = (<nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" onClick={() => this.handlePrevious()}>
              <span>&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {pageNumber}
          <li className="page-item">
            <a className="page-link" onClick={() => this.handleNext()}>
              <span>&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>);

      return pageNumberList;
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
        {getPageNumber()}
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