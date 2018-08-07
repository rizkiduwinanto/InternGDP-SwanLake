import React from 'react';
import { connect } from 'react-redux'
import Forum from '../components/Forum';
import { fetchForumList } from '../actions/forumAction';
import Spinner from '../components/Spinner';
import { Input } from '@material-ui/core';

class ListOfForum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      valueText: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({valueText : event.target.value});
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.fetchForumList();
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  renderSearchBar() {
    return (
    <div className="input-group" style={{position: 'sticky', top:'0px', zIndex:'100'}}> 
      <input type="text" className="form-control" placeholder="Search Forum" value={this.state.valueText} onChange={this.handleChange}/>
    </div>);
  }

  render() {
    var listOfForum = <div></div>;
    if (this.state.loading) {
      listOfForum = <Spinner />;
    } else {
      const rows = [];
      if (this.props.forum_list.data != null) {
        this.props.forum_list.data.forEach((forum) => {
          let index = forum.forum_name.toLowerCase().indexOf(this.state.valueText.toLowerCase());
          if (index !== -1) {
            rows.push(<Forum forum = {forum} key = {forum.forum_id}/>);
          }
        });
      }
      listOfForum = <div className="list-group">{rows}</div>
    }

    return (
      <div style={{maxHeight: '80vh', overflow: 'auto'}} >
        {this.renderSearchBar()}
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