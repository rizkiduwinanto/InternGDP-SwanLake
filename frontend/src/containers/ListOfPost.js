import React from 'react';
import Post from '../components/Post';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import { API_URL } from '../config';
const socket = io.connect(`${API_URL}`);

class ListOfPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.forum.forum_id !== 0) {
      if ((prevProps.forum.forum_id !== this.props.forum.forum_id)) {
        socket.on(`post:${this.props.forum.forum_id}:new`,(data)=>{
          data['value'] = false;
          this.setState({posts : [...this.state.posts, data]});
        })
        socket.on(`post:${this.props.forum.forum_id}:update`,(data)=>{
          data['value'] = true;
          this.setState({posts : [...this.state.posts, data]});
        })
      }
    }
  }

  render() {
    const rows  = this.props.posts.map((post, i) => 
      <Post post = {post} key = {i} updated={post.value}/>
    );

    return (
      <div style={{maxHeight: '80vh', overflow: 'auto'}}>
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