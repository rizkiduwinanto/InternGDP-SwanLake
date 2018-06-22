import React from 'react';
import { List, Paper } from '@material-ui/core';
import {connect} from 'react-redux'
import Thread from './Thread';
import io from 'socket.io-client';

const socket = io.connect('http://35.231.65.98:3001');

class ListOfThread extends React.Component {
  constructor(props) {
    super(props);
    console.dir(socket);
    this.state = {
      arr_new: []
    }
  }

  componentDidUpdate(prevProps){
    console.log(this.props.forum.forum_id);
    if (this.props.forum.forum_id !== 0) {
      if ((prevProps.forum.forum_id !== this.props.forum.forum_id)) {
        socket.on(`thread:${this.props.forum.forum_id}:new`,(data)=>{
          console.log(`New thread :`);
          console.log(data);
          this.setState({arr_new : [...this.state.arr_new, data]});
        })
        socket.on(`thread:${this.props.forum.forum_id}:update`,(data)=>{
          console.log(`Updated thread :`);
          console.log(data);
          this.setState({arr_new : [...this.state.arr_new, data]});
        })
      }
    }
  }

  render() {
    const rows = this.state.arr_new.map((thread, i) =>
      <Thread thread = {thread} key = {i}/>
    );

    return (
      <Paper style={{maxHeight: 570, overflow: 'auto'}} >
        <List>
          {rows}
        </List>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    forum: state.forum
  };
}

export default connect(mapStateToProps)(ListOfThread);