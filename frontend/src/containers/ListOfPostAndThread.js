import React from 'react';
import Post from '../components/Post';
import Thread from '../components/Thread';
import {connect} from 'react-redux';
import SocketContext from '../miscellaneous/SocketContext';

class ListOfPostAndThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.forum.forum_id !== 0) {
      if ((prevProps.forum.forum_id !== this.props.forum.forum_id)) {
        this.setState({datas : []});
        this.props.socket.on(`post:new`,(datum, forum_id)=>{
          if (this.props.forum.forum_id == forum_id) {
            datum['new'] = true;
            datum['type'] = 'post';
            let index = this.state.data.findIndex((datumState) => datumState.id === datum.id);
            if (index === -1) {
              this.setState({data: [datum, ...this.state.data]});
            } else {
              this.state.data.splice(index, 1);
              this.setState({data: [datum, ...this.state.data]});
            }
          }
        });
        this.props.socket.on(`post:update`,(datum, forum_id)=>{
          if (this.props.forum.forum_id == forum_id.forum_id) {
            datum['new'] = false;
            datum['type'] = 'post'; 
            let index = this.state.data.findIndex((datumState) => datumState.id === datum.id);
            if (index === -1) {
              this.setState({data: [datum, ...this.state.data]});
            } else {
              this.state.data.splice(index, 1);
              this.setState({data: [datum, ...this.state.data]});
            }
          }
        });
        this.props.socket.on(`thread:new`,(datum)=>{
          if (this.props.forum.forum_id == datum.forum_id) {
            datum['new'] = true;
            datum['type'] = 'thread';
            let index = this.state.data.findIndex((datumState) => datumState.id === datum.id);
            if (index === -1) {
              this.setState({data: [datum, ...this.state.data]});
            } else {
              this.state.data.splice(index, 1);
              this.setState({data: [datum, ...this.state.data]});
            }
          }
        });
        this.props.socket.on(`thread:update`,(datum)=>{
          if (this.props.forum.forum_id == datum.forum_id) {
            datum['new'] = false;
            datum['type'] = 'thread'; 
            let index = this.state.data.findIndex((datumState) => datumState.id === datum.id);
            if (index === -1) {
              this.setState({data: [datum, ...this.state.data]});
            } else {
              this.state.data.splice(index, 1);
              this.setState({data: [datum, ...this.state.data]});
            }
          }
        });
      }
    }
  }

  render() {
    console.log(this.props.forum);

    const rows = [];
    this.state.data.forEach((row, i) => {
      if (row['type'] === 'thread') {
        rows.push(<Thread thread = {row} key = {i} updated={!row['new']}/>);
      } else {
        rows.push(<Post post = {row} key = {i} updated={!row['new']}/>);
      }
    });

    let empty = <div className="text-center" style={{paddingTop : '35.5vh', paddingBottom : '30vh'}}><h5>{this.props.forum.forum_name != null ? 'Empty list, so far' : 'Select a Forum, First'}</h5></div>;

    return (
      <div style={{maxHeight: '80vh', overflow: 'auto'}}>
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
    {socket => <ListOfPostAndThread {...props} socket={socket}/>}
  </SocketContext.Consumer>
)

export default connect(mapStateToProps)(ListOfPostAndThreadWithSocket);