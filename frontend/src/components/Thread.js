import React from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';

class Thread extends React.Component {
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
    window.location = `https://www.kaskus.co.id/thread/${id}`
  }

  render() {
    const thread = this.props.thread;

    return (
      <div>
        <a className="list-group-item list-group-item-action flex-column align-items-start" onClick={this.handleOpen}>
          <small><strong>Thread</strong></small>
          <div className="d-flex w-100 justify-content-between">
            <h6 className="mb-1"><strong>{thread.title}</strong> {this.props.updated ? <span className="badge badge-success">Updated</span> : <span className="badge badge-primary">New</span>} </h6>
          </div>
          <small><strong>{thread.post_username}</strong></small>
        </a>
        <Dialog open={this.state.open} onClose={this.handleClose} scroll='paper'>
        <DialogTitle>{thread.title}</DialogTitle>
        <DialogContent>{thread.post_username}</DialogContent>
        <DialogActions>
          <Button onClick={(e) => this.handlePage(thread.id)} color="primary">
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


export default Thread;