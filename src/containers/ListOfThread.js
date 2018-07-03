import React from 'react';
import {connect} from 'react-redux'
import Thread from './Thread';
import io from 'socket.io-client';

const socket = io.connect('http://10.181.24.141:3001');

class ListOfThread extends React.Component {
  constructor(props) {
    super(props);
    console.dir(socket);
    this.state = {
      arr: []
    }
  }

  componentDidUpdate(prevProps){
    console.log(this.props.forum.forum_id);
    if (this.props.forum.forum_id !== 0) {
      if ((prevProps.forum.forum_id !== this.props.forum.forum_id)) {
        socket.on(`thread:${this.props.forum.forum_id}:new`,(data)=>{
          console.log(`New thread :`);
          console.log(data);
          data['value'] = false;
          this.setState({arr: [...this.state.arr, data]});
        })
        socket.on(`thread:${this.props.forum.forum_id}:update`,(data)=>{
          console.log(`Updated thread :`);
          console.log(data);
          data['value'] = true;
          this.setState({arr : [...this.state.arr, data]});
        })
      }
    }
  }

  render() {
    const rows = this.state.arr.map((thread, i) =>
      <Thread thread = {thread} key = {i} updated={thread.value}/>
    );

    return (
      <div style={{maxHeight: '90vh', overflow: 'auto'}} >
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