import React from 'react';
import { connect } from 'react-redux'
import Forum from '../components/Forum';
import { fetchForumList } from '../actions/forumAction';
import Spinner from '../components/Spinner';

class ListOfForum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.fetchForumList();
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    var listOfForum = <div></div>;
    if (this.state.loading) {
      listOfForum = <Spinner />;
    } else {
      const rows = [];
      if (this.props.forum_list.data != null) {
        this.props.forum_list.data.forEach((forum) => {
          rows.push(
            <Forum forum = {forum} key = {forum.forum_id}/>);
        });
      }
      listOfForum = <div className="list-group">{rows}</div>
    }

    return (
      <div style={{maxHeight: '80vh', overflow: 'auto'}} >
        {listOfForum}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    forum_list : state.frequent.forumList
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchForumList: () => dispatch(fetchForumList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfForum);