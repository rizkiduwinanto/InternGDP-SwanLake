import React from 'react';
import Post from './Post';
import {connect} from 'react-redux';
import io from 'socket.io-client';

const socket = io.connect('http://10.181.24.141:3001');

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
        socket.on(`post:${this.props.forum.forum_id}:new`,(data)=>{
          console.log(`New post :`);
          console.log(data);
          this.setState({arr_new : [...this.state.arr_new, data]});
        })
        socket.on(`post:${this.props.forum.forum_id}:update`,(data)=>{
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
      <div id="accordion" style={{maxHeight: 570, overflow: 'auto'}}>
        {rows}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    forum: state.forum,
    post: state.posts
  };
}

export default connect(mapStateToProps)(ListOfPost);