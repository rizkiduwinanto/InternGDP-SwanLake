import React from 'react';
import { withRouter } from 'react-router-dom';
import Thread from '../components/Thread';
import { connect } from 'react-redux';
import SocketContext from '../miscellaneous/SocketContext';

class ListOfPostAndThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      posts: []
    }
  }

  componentDidMount() {
    this.props.socket.on(`post:new`, (post) => {
      post['new'] = true;
      let index = this.state.posts.findIndex((postState) => postState.id === post.id);
      if (index === -1) {
        this.setState({ posts: [post, ...this.state.posts] });
      } else {
        this.state.posts.splice(index, 1);
        this.setState({ posts: [post, ...this.state.posts] });
      }
    });
    this.props.socket.on(`post:update`, (post) => {
      post['new'] = false;
      let index = this.state.posts.findIndex((postState) => postState.id === post.id);
      if (index === -1) {
        this.setState({ posts: [post, ...this.state.posts] });
      } else {
        this.state.posts.splice(index, 1);
        this.setState({ posts: [post, ...this.state.posts] });
      }
    });
    this.props.socket.on(`thread:new`, (thread) => {
      thread['new'] = true;
      let index = this.state.threads.findIndex((threadState) => threadState.id === thread.id);
      if (index === -1) {
        this.setState({ threads: [thread, ...this.state.threads] });
      } else {
        this.state.threads.splice(index, 1);
        this.setState({ threads: [thread, ...this.state.threads] });
      }
    });
    this.props.socket.on(`thread:update`, (thread) => {
      thread['new'] = false;
      let index = this.state.threads.findIndex((threadState) => threadState.id === thread.id);
      if (index === -1) {
        this.setState({ threads: [thread, ...this.state.threads] });
      } else {
        this.state.threads.splice(index, 1);
        this.setState({ threads: [thread, ...this.state.threads] });
      }
    });
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners('post:new');
    this.props.socket.removeAllListeners('post:update');
    this.props.socket.removeAllListeners('thread:new');
    this.props.socket.removeAllListeners('thread:update');
  }

  render() {
    const rows = [];
    if (this.state.threads.length !== 0 && this.props.forum.forum_id !== null) {
      let data = this.state.threads.filter((row) => row.forum_id == this.props.forum.forum_id);
      data.forEach((row, i) => {
        let posts = this.state.posts.filter((post) => post.thread_id === row.id);
        rows.push(<Thread thread={row} key={i} updated={!row['new']} posts = {posts}/>);
      });
    }

    let empty = <div className="text-center" style={{paddingTop : '35.5vh', paddingBottom : '30vh'}}><h5>{this.props.forum.forum_name != null ? 'Empty list, so far' : 'Select a Forum, First'}</h5></div>;

    return (
      <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
        <div className="list-group">
          {rows.length === 0 ? empty : rows}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    forum: state.selectedForum
  };
}

const ListOfPostAndThreadWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <ListOfPostAndThread {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default withRouter(connect(mapStateToProps)(ListOfPostAndThreadWithSocket));