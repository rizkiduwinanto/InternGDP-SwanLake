import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { STREAM_POST } from './DataPost';
import { STREAM_THREAD } from './DataThread';
import { List, ListItem, ListItemText, Divider, ExpansionPanel, ExpansionPanelSummary, Grid, ExpansionPanelDetails, Typography } from '@material-ui/core';

class Main extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs>
          <ListOfThread threads = {STREAM_THREAD} />
        </Grid>
        <Grid item xs={8}>
          <ListOfPost posts = {STREAM_POST} />
        </Grid>
      </Grid>
    );
  }
}

class ListOfThread extends React.Component {
  render() {
    const rows = this.props.threads.map((thread) =>
      <Thread thread = {thread} key = {thread.id} posts = {STREAM_POST}/>
    );

    return (
      <List>
        {rows}
      </List>
    );
  }
}

class Thread extends React.Component {
  render() {
    const thread = this.props.thread;

    return (
      <ListItem button divider onClick = {(e) => this.props.itemSelected(2, e)}>
        <ListItemText
          primary = {thread.title}
          secondary = {thread.post_username}
        />
      </ListItem>
    );
  }
}

class ListOfPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {thread_id : null};
  }

  render() {
    const rows  = [];
    this.props.posts.forEach((post) => {
      rows.push(<Post post = {post} key = {post.id}/>);
    });

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded : null};
  }

  render() {
    const post = this.props.post;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>{post.title}</Typography>
          <Typography>{post.post_username}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{post.page_text}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Main;