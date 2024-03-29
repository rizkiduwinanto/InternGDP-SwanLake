import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handlePage(id){
    this.setState({ open: false });
    window.open(`https://www.kaskus.co.id/show_post/${id}`);
  }

  render() {
    const post = this.props.post;
    const pageText = post.page_text.length <= 25 ? post.page_text : post.page_text.substr(0,25) + '...';
    const pageTextHeadline = post.page_text.length <= 50 ? post.page_text : post.page_text.substr(0,50) + '...';
    const title = post.title === '' ? pageText : post.title;
    
    return (
      <div>
        <a className="list-group-item list-group-item-action flex-column align-items-start" onClick={this.handleOpen}>
          <small><strong>Post</strong></small>
          <div className="d-flex w-100 justify-content-between">
            <h6 className="mb-1"><strong>{title}</strong> {this.props.updated ? <span className="badge badge-success">Updated</span> : <span className="badge badge-primary">New</span>} </h6>
          </div>
          <small>{pageTextHeadline}</small><br/>
          <small><strong>{post.post_username}</strong></small>
        </a>
        <Dialog open={this.state.open} onClose={this.handleClose} scroll='paper'>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{post.post_username}</DialogContent>
        <DialogContent>
          <DialogContentText>
            {post.page_text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => this.handlePage(post.id)} color="primary">
            Open Page
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Post;