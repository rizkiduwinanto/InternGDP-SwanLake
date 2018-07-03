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
      arr: []
    }
  }

  componentDidUpdate(prevProps){
    console.log(this.props.forum.forum_id);
    if (this.props.forum.forum_id !== 0) {
      if ((prevProps.forum.forum_id !== this.props.forum.forum_id)) {
        socket.on(`post:${this.props.forum.forum_id}:new`,(data)=>{
          console.log(`New post :`);
          console.log(data);
          data['value'] = false;
          this.setState({arr : [...this.state.arr, data]});
        })
        socket.on(`post:${this.props.forum.forum_id}:update`,(data)=>{
          console.log(`Updated post :`);
          console.log(data);
          data['value'] = true;
          this.setState({arr : [...this.state.arr, data]});
        })
      }
    }
  }

  render() {
    const rows  = this.state.arr.map((post, i) => 
      <Post post = {post} key = {i} updated={post.value}/>
    );

    return (
      <div style={{maxHeight: '90vh', overflow: 'auto'}}>
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
    posts: state.posts
  };
}

export default connect(mapStateToProps)(ListOfPost);