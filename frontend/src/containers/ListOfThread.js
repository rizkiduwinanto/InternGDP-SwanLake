import React from 'react';
import {connect} from 'react-redux'
import Thread from '../components/Thread';
import io from 'socket.io-client';
import { API_URL } from '../config';
const socket = io.connect(`${API_URL}`);

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
        this.setState({threads : []});
        socket.on(`thread:new`,(data)=>{
          if (this.props.forum.forum_id == data.forum_id) {
            data['value'] = false;
            this.setState({threads: [...this.state.threads, data]});
          }
        })
        socket.on(`thread:update`,(data)=>{
          if (this.props.forum.forum_id == data.forum_id) {
            data['value'] = true;
            this.setState({threads : [...this.state.threads, data]});
          }
        })
      }
    }
  }

  render() {
    const rows = this.state.threads.map((thread, i) =>
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
    threads: state.thread
  };
}

export default connect(mapStateToProps)(ListOfThread);