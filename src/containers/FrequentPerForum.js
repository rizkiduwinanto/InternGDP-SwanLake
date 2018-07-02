import React from 'react';
import { Typography, Paper, Button, List, TextField, ListItem, ListItemText, Grid } from '@material-ui/core';
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
      forum: null,
      loading: false
    };
    this.handleSince = this.handleSince.bind(this);
    this.handleUntil = this.handleUntil.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
    this.handleForum = this.handleForum.bind(this);
  }

  componentDidMount() {
    this.props.fetchForumList();
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

  handleForum(forum) {
    this.setState({ forum : forum });
  }

  handleChange() {
    if (this.props.forum != null) {
      this.setState({ loading: true });
      this.props.fetchFrequentPerForum(this.state.since, this.state.until, this.state.limit, this.props.forum.forum_id);
    } else {
      alert('Choose a forum first!');
    }
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  renderTable() {
    const getData = () => {
      if (this.state.loading || this.props.data.data == null){
        return;
      }
      if (this.props.data.data.length == 0){
        return (
          <tr>
            <td>{"No data found for this period"}</td>
          </tr>
        );
      }
      let rows = this.props.data.data.map((freqPerForum, i) => 
        <tr key={i}>
          <td>{freqPerForum.post_username}</td>
          <td>{freqPerForum.post_count}</td>
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
              <th>Post Count</th>
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
    const rows = [];
    if (this.props.forum_list.data != null) {
      this.props.forum_list.data.forEach((forum) => {
        rows.push(
          <ListItem button key={forum.forum_id} onClick={() => this.handleForum(forum)}>
            <ListItemText primary={forum.forum_name}/>
          </ListItem>);
      });
    } 

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
    forum_list : state.frequent.forumList,
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