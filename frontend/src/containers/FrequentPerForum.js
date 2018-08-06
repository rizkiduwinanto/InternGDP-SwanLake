import React from 'react';
import { Typography, Button, TextField, Grid } from '@material-ui/core';
import { fetchFrequentPerForum } from '../actions/frequentPerForumAction';
import { fetchForumList } from '../actions/forumAction';
import { connect } from 'react-redux';
import FrequentNavTabs from '../components/FrequentNavTabs';
import DatePicker from '../components/DatePicker';
import Spinner from '../components/Spinner';
import ForumSelector from './ForumSelector';

const tableStyle = {
  margin: '0 auto',
  marginTop: '20px',
  width: '90%'
}

class FrequentPerForum extends React.Component {
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
    this.handleFirst = this.handleFirst.bind(this); 
    this.handleLast = this.handleLast.bind(this); 
    this.handleUsername = this.handleUsername.bind(this);
   }

  handleLimit(event){
    this.setState({ limit : event.target.value });
  }

  handleSince(since) {
    this.setState({ since : since });
  }

  handleUntil(until) {
    this.setState({ until : until });
  }

  handleChange() {
    if (this.props.forum != null) {
      this.setState({ loading: true });
      this.props.fetchFrequentPerForum(this.state.since, this.state.until, this.state.limit, this.props.forum.forum_id);
      this.setState({currentPage : 1});
    } else {
      alert('Choose a forum first!');
    }
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

  handleLast() {
    const numberOfPageItem = Math.ceil(this.props.data.data.length/this.state.dataPerPage);
    if (this.state.currentPage < numberOfPageItem) {
      this.setState({
        currentPage: numberOfPageItem
      });
    }
  }

  handleFirst() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1
      });
    }
  }

  handleUsername = (user_id, e) => {
    e.preventDefault();
    window.location = `https://www.kaskus.co.id/profile/${user_id}`;
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
            <td colSpan="2">{"No data found for this period"}</td>
          </tr>
        );
      }

      let indexLast = currentPage * dataPerPage;
      let indexFirst = indexLast - dataPerPage; 
      let currentData = this.props.data.data.slice(indexFirst, indexLast);
      let rows = currentData.map((freqGlobal, i) => 
        <tr key={i}>
          <td><a href='#' onClick={(e) => this.handleUsername(freqGlobal.post_user_id, e)}>{freqGlobal.post_username}</a></td>
          <td>{freqGlobal.post_count}</td>
        </tr>
      );
      return rows;
    }

    const getPageNumber = () => {
      const { currentPage, dataPerPage } = this.state;

      if ((this.state.loading || this.props.data.data == null) || this.props.data.data.length <= dataPerPage){
        return;
      }
      
      let pageNumber = [];

      const numberOfPageItem = Math.ceil(this.props.data.data.length/dataPerPage);

      var startPage, endPage;
      if (numberOfPageItem <= 10) {
         startPage = 1;
         endPage = numberOfPageItem;
      } else {
        if (currentPage <= 3) {
          startPage = 1;
          endPage = 5;
        } else if (currentPage + 2 >= numberOfPageItem) {
          startPage = numberOfPageItem - 4;
          endPage = numberOfPageItem;
        } else {
          startPage = currentPage - 2;
          endPage = currentPage + 2;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumber.push(<li key={i} className="page-item"><a onClick={() => this.handleClick(i)} className="page-link">{i}</a></li>)
      }

      const firstDirection = (
        <li className="page-item">
          <a className="page-link" onClick={() => this.handleFirst()}>
            <span>&laquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      );

      const previousDirection = (
        <li className="page-item">
          <a className="page-link" onClick={() => this.handlePrevious()}>
            <span>&lt;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
      );

      const nextDirection = (
        <li className="page-item">
          <a className="page-link" onClick={() => this.handleNext()}>
            <span>&gt;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      );

      const lastDirection = (
        <li className="page-item">
          <a className="page-link" onClick={() => this.handleLast()}>
            <span>&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      );

      let pageNumberList = (<div>
        <small>Page {this.state.currentPage} of {numberOfPageItem}</small>
        <nav>
          <ul className="pagination justify-content-center">
            {currentPage === 1 ? <br/> : firstDirection}
            {currentPage === 1 ? <br/> : previousDirection}
            {pageNumber}
            {currentPage === numberOfPageItem ? <br/> : nextDirection}
            {currentPage === numberOfPageItem ? <br/> : lastDirection}
          </ul>
        </nav>
      </div>);

      return pageNumberList;
    }

    const showSpinnerWhenLoading = () => (this.state.loading) ? <Spinner /> : "";
    
    return(
      <div>
        <table className="table table-bordered centerTable" style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th>Post Username</th>
              <th>Post Count</th>
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
        <FrequentNavTabs selectedTab='perforum' />
        <Typography className="text-center py-3" variant="display2">Frequent Poster Perforum</Typography>
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
            <Typography variant="subheading" ><strong>Forum {this.props.forum == null ? '' : ': ' + this.props.forum.forum_name}</strong></Typography>
            <ForumSelector/>
          </Grid>
        </Grid>
        <div className="text-center align-center">
          {this.renderTable()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    since : state.frequent.since_perforum,
    until : state.frequent.until_perforum,
    data : state.frequent.frequentPerForum,
    limit : state.frequent.limit_perforum,
    forum : state.frequent.forum
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchForumList: () => dispatch(fetchForumList()),
    fetchFrequentPerForum: (since, until, limit, forum_id) => dispatch(fetchFrequentPerForum(since, until, limit, forum_id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrequentPerForum);