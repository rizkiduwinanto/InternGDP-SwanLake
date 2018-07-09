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
    };
    this.handleForum = this.handleForum.bind(this);
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

  render() {
    var forumSelector = <div></div>;
    if (this.state.loading) {
      forumSelector = <Spinner />;
    } else {
      const rows = [];
      if (this.props.forum_list.data != null) {
        this.props.forum_list.data.forEach((forum) => {
          rows.push(
            <ListItem button key={forum.forum_id} onClick={() => this.handleForum(forum)}>
              <ListItemText primary={forum.forum_name}/>
            </ListItem>);
        });
      }
      forumSelector = <List>{rows}</List>;
    }

    return (
      <Paper style={{maxHeight: 200, maxWidth: '80%', overflow: 'auto'}}>
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

