import React from 'react';
import { Paper, List, ListItem, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchForumList } from '../actions/forumAction';
import { updateForum } from '../actions/frequentPerForumAction'
import Spinner from '../components/Spinner';

class ForumSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forum: null,
      loading: false,
      valueText: '',
    };
    this.handleForum = this.handleForum.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({valueText : event.target.value});
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.props.fetchForumList();
  }
  
  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  handleForum(forum) {
    this.setState({ forum : forum });
    this.props.updateForum(forum);
  }

  renderSearchBar() {
    return (
    <div className="input-group" style={{position: 'sticky', top:'0px', zIndex:'100'}}> 
      <input type="text" className="form-control" placeholder="Search Forum" value={this.state.valueText} onChange={this.handleChange}/>
    </div>);
  }

  render() {
    var forumSelector = <div></div>;
    if (this.state.loading) {
      forumSelector = <Spinner />;
    } else {
      const rows = [];
      if (this.props.forum_list.data != null) {
        this.props.forum_list.data.forEach((forum) => {
          let index = forum.forum_name.toLowerCase().indexOf(this.state.valueText.toLowerCase());
          if (index !== -1) {
            rows.push(
              <ListItem button key={forum.forum_id} onClick={() => this.handleForum(forum)}>
                <ListItemText primary={forum.forum_name}/>
              </ListItem>);
          }
        });
      }
      let empty = <div className="text-center" style={{paddingTop : 55, paddingBottom : 55}}><h5> Empty list, or does not match </h5></div>;
      forumSelector = rows.length === 0 ? empty : <List>{rows}</List>;
    }

    return (
      <Paper style={{maxHeight: 200, maxWidth: '80%', overflow: 'auto'}}>
        {this.renderSearchBar()}
        {forumSelector}
      </Paper>
    )
  }
}

function mapStateToProps(state){
  return {
    forum_list : state.frequent.forumList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchForumList: () => dispatch(fetchForumList()),
    updateForum: (forum) => dispatch(updateForum(forum))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumSelector);

