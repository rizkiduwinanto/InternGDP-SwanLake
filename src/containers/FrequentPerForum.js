import React from 'react';
import { Table, Typography, Paper, Button, List, TextField, ListItem, ListItemText, Grid } from '@material-ui/core';
import ListFrequentPerForum from './ListFrequentPerForum';
import FrequentPerForumHead from '../components/FrequentPerForumHead';
import { updateFrequentPerForum } from '../actions/frequentPerForumAction';
import { fetchForumList } from '../actions/forumAction';
import { connect } from 'react-redux';
import FrequentNavTabs from '../components/FrequentNavTabs';
import DatePicker from '../components/DatePicker';

class FrequentPerForum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: new Date(),
      until: new Date(),
      limit: 0
    };
    this.handleSince = this.handleSince.bind(this);
    this.handleUntil = this.handleUntil.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
  }

  componentDidMount() {
    this.props.fetchForumList();
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
    this.props.updateFrequentPerForum(this.state.since, this.state.until);
  }

  render(){
    const rows = [];
    if (this.props.forum_list.data != null) {
      this.props.forum_list.data.forEach((forum, i) => {
        rows.push(
          <ListItem button key={forum.forum_id}>
            <ListItemText primary={forum.forum_name}/>
          </ListItem>);
      });
    }

    return (
      <Paper>
        <FrequentNavTabs/>
        <Typography  className="text-center py-3" variant="title" >{this.props.forum_name}</Typography>
        <Grid container>
          <Grid item xs={6}>
            <DatePicker label='Start Date' handleChange={this.handleSince} date={this.state.since} />
            <DatePicker label='End Date' handleChange={this.handleUntil} date={this.state.until} />
            <div className="text-center">
              <TextField type="number" label="Limit" placeholder="Insert Limit" value = {this.state.limit}/>
              <br/>
              <Button color="primary" onClick={this.handleChange}>Show!</Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subheading" ><strong>Forum</strong></Typography>
            <Paper style={{maxHeight: 200, maxWidth: '80%', overflow: 'auto'}}>
              <List>
                {rows}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Table>
          <FrequentPerForumHead />
          <ListFrequentPerForum />
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps(state){
  return {
    forum_name: state.frequent.name,
    forum_list : state.frequent.forumList
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchForumList: () => dispatch(fetchForumList()),
    updateFrequentPerForum: (since, until) => dispatch(updateFrequentPerForum(since, until))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrequentPerForum);