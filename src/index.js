import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { STREAM_POST } from './DataPost';
import { STREAM_THREAD } from './DataThread';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Toolbar} from '@material-ui/core';
import Navbar from './Navbar';

class Main extends React.Component {
  render() {
    const rows = this.props.threads.map((thread) =>
      <Thread thread = {thread} key = {thread.id} posts = {STREAM_POST}/>
    );

    return (
      <body>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thread Title</TableCell>
              <TableCell>Thread Username</TableCell>
              <TableCell>Post</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </body>
    );
  }
}

class Thread extends React.Component {
  render() {
    const thread = this.props.thread;
    const posts = [];

    this.props.posts.forEach((post) => {
      if (post.thread_id === thread.id) {
        posts.push(
          <Post post = {post} key = {post.id}/>
        )
      }
    });

    return (
      <TableRow>
        <TableCell>{thread.title}</TableCell>
        <TableCell>{thread.post_username}</TableCell>
        {posts.length > 0 ? posts : (<TableRow></TableRow>)}
      </TableRow>
    );
  }
}

class Post extends React.Component {
  render() {
    const post = this.props.post;

    return (
      <TableRow>
        <TableCell>
          <li>Title : {post.title}</li>
          <li>Username : {post.post_username}</li>
          {/* <li>Post : {post.page_text}</li> */}
        </TableCell>
      </TableRow>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <body>
        <Navbar />
        <Main threads = {STREAM_THREAD} />
      </body>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
