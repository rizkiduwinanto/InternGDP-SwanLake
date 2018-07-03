import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.isOpen = this.isOpen.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state.open);
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
    debugger
  }

  isOpen = () => {
    return this.state.open;
  }

  render() {
    const post = this.props.post;
    const pageText = post.page_text.length <= 25 ? post.page_text : post.page_text.substr(0,25) + '...';
    const title = post.title == '' ? pageText : post.title;
    return (
      <a className="list-group-item list-group-item-action flex-column align-items-start" onClick={this.handleOpen}>
        <div className="d-flex w-100 justify-content-between">
          <h6 className="mb-1"><strong>{title}</strong> {this.props.updated ? <span className="badge badge-success">Updated</span> : <span className="badge badge-primary">New</span>} </h6>
        </div>
        <small><strong>{post.post_username}</strong></small>
        <Dialog open={this.isOpen()} onClose={this.handleClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {post.page_text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </a>
    );
  }
}

export default Post;