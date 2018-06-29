import React from 'react';
import { Typography, Paper, Button, List, TextField, ListItem, ListItemText, Grid } from '@material-ui/core';
import ListFrequentPerForum from './ListFrequentPerForum';
import FrequentPerForumHead from '../components/FrequentPerForumHead';
import { updateFrequentPerForum } from '../actions/frequentPerForumAction';
import { fetchForumList } from '../actions/forumAction';
import { connect } from 'react-redux';
import FrequentNavTabs from '../components/FrequentNavTabs';
import DatePicker from '../components/DatePicker';

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
      forum: null
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
    if (this.state.forum !== null) {
      this.props.updateFrequentPerForum(this.state.since, this.state.until, this.state.limit, this.state.forum);
    } else {
      alert("Choose one Forum");
    }
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
            <Typography variant="subheading" ><strong>Forum {this.state.forum == null ? '' : ': ' + this.state.forum.forum_name}</strong></Typography>
            <Paper style={{maxHeight: 200, maxWidth: '80%', overflow: 'auto'}}>
              <List>
                {rows}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <div className="text-center align-center">
          <table className="table table-bordered centerTable" style={tableStyle}>
            <FrequentPerForumHead />
            <ListFrequentPerForum />
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    forum_list : state.frequent.forumList
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchForumList: () => dispatch(fetchForumList()),
    updateFrequentPerForum: (since, until, limit, forum) => dispatch(updateFrequentPerForum(since, until, limit, forum))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrequentPerForum);