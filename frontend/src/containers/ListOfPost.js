import React from 'react';
import Post from '../components/Post';
import {connect} from 'react-redux';
import SocketContext from '../miscellaneous/SocketContext';

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
        this.setState({posts : []});
        this.props.socket.on(`post:new`,(data)=>{
          if (this.props.forum.forum_id === data.forum_id) {
            data['value'] = false;
            this.setState({posts : [...this.state.posts, data]});
          }
        })
        this.props.socket.on(`post:update`,(data)=>{
          if (this.props.forum.forum_id === data.forum_id) {
            data['value'] = true;
            this.setState({posts : [...this.state.posts, data]});
          }
        })
      }
    }
  }

  render() {
    const rows  = this.state.posts.map((post, i) => 
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

const ListOfPostWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <ListOfPost {...props} socket={socket}/>}
  </SocketContext.Consumer>
)

export default connect(mapStateToProps)(ListOfPostWithSocket);