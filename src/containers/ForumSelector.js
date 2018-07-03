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
    const showSpinnerWhenLoading = () => (this.state.loading) ? <Spinner /> : <List>{rows}</List>;
    const rows = [];
    if (this.props.forum_list.data != null) {
      this.props.forum_list.data.forEach((forum) => {
        rows.push(
          <ListItem button key={forum.forum_id} onClick={() => this.handleForum(forum)}>
            <ListItemText primary={forum.forum_name}/>
          </ListItem>);
      });
    }

    return (
      <Paper style={{maxHeight: 200, maxWidth: '80%', overflow: 'auto'}}>
        {showSpinnerWhenLoading()}
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

