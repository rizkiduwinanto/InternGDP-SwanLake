import React from 'react';
import { connect } from 'react-redux';
import { Dialog, TextField, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { fetchEmail, patchEmail } from '../actions/keywordAction';

const inlineTextStyle = {
  marginTop : 20
}

class KeywordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmail: false,
      email: '',
    }

    this.handleOpenEditEmail = this.handleOpenEditEmail.bind(this);
    this.handleCloseEditEmail = this.handleCloseEditEmail.bind(this);
    this.handleEditEmail = this.handleEditEmail.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  componentWillMount() {
    this.props.fetchEmail();
  }

  handleOpenEditEmail() {
    this.setState({ editEmail: true });
  }

  handleCloseEditEmail() {
    this.setState({ editEmail: false, email: ''});
  }

  handleEditEmail() {
    this.props.patchEmail(this.state.email);
    this.setState({ editEmail: false, email: ''});
  }

  onChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  render() {
    return (
      <div style={inlineTextStyle}>
        <h5>Email to : {this.props.email} <a onClick={this.handleOpenEditEmail}>Edit</a></h5>
        <Dialog open={this.state.editEmail} onClose={this.handleCloseEditEmail}>
          <DialogTitle>Edit Email</DialogTitle>
          <form onSubmit={(e)=>{
            e.preventDefault();
            this.handleEditEmail();
            e.target.reset();
            }}>
            <DialogContent>
              <TextField
                autoFocus
                label="Email Address"
                type="email"
                margin="dense"
                fullWidth
                onChange={this.onChangeEmail}
                value={this.state.value}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseEditEmail}>Cancel</Button>
              <Button type="submit">Edit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    email: state.keyword.email,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEmail: () => dispatch(fetchEmail()),
    patchEmail: (email) => dispatch(patchEmail(email))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(KeywordTable);