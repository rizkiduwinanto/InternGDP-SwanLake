import React from 'react';
import Post from './Post';
import {connect} from 'react-redux'
import { Paper } from '@material-ui/core';
import io from 'socket.io-client';

const socket = io.connect('http://35.231.65.98:3001');

class ListOfPost extends React.Component {
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
        socket.on(`post:768:new`,(data)=>{
          console.log(`New post :`);
          console.log(data);
          this.setState({arr_new : [...this.state.arr_new, data]});
        })
        socket.on(`post:768:update`,(data)=>{
          console.log(`Updated post :`);
          console.log(data);
          this.setState({arr_new : [...this.state.arr_new, data]});
        })
      }
    }
  }

  render() {
    const rows  = this.state.arr_new.map((post, i) => 
      <Post post = {post} key = {i}/>
    );

    return (
      <Paper style={{maxHeight: 570, overflow: 'auto'}}>
        {rows}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    forum: state.forum
  };
}

export default connect(mapStateToProps)(ListOfPost);