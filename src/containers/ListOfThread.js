import React from 'react';
import {connect} from 'react-redux'
import Thread from '../components/Thread';
import io from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:3001');

class ListOfThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: []
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.forum.forum_id !== 0) {
      if ((prevProps.forum.forum_id !== this.props.forum.forum_id)) {
        socket.on(`thread:${this.props.forum.forum_id}:new`,(data)=>{
          data['value'] = false;
          this.setState({threads: [...this.state.threads, data]});
        })
        socket.on(`thread:${this.props.forum.forum_id}:update`,(data)=>{
          data['value'] = true;
          this.setState({threads : [...this.state.threads, data]});
        })
      }
    }
  }

  render() {
    const rows = this.props.thread.map((thread, i) =>
      <Thread thread = {thread} key = {i} updated={thread.value}/>
    );

    return (
      <div style={{maxHeight: '80vh', overflow: 'auto'}} >
        <div className="list-group">
          {rows}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    forum: state.selectedForum,
    thread: state.thread
  };
}

export default connect(mapStateToProps)(ListOfThread);