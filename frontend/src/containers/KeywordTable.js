import React from 'react';
import { connect } from 'react-redux';
import { Dialog, TextField, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@material-ui/core';
import { fetchKeyword, patchKeyword, deleteKeyword } from '../actions/keywordAction';
import { API_URL } from '../config';

const tableStyle = {
  margin: '0 auto',
  marginTop: '20px',
  width: '50%'
}

class KeywordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editKeywordDialog: false,
      deleteKeywordDialog: false,
      keyword: '',
      interval: 0
    }

    this.handleOpenKeyword = this.handleOpenKeyword.bind(this);
    this.handleCloseKeyword = this.handleCloseKeyword.bind(this);
    this.handleEditKeyword = this.handleEditKeyword.bind(this);
    this.onChangeKeywordInterval = this.onChangeKeywordInterval.bind(this);

    this.handleOpenDeleteKeyword = this.handleOpenDeleteKeyword.bind(this);
    this.handleCloseDeleteKeyword = this.handleCloseDeleteKeyword.bind(this);
    this.handleDeleteKeyword = this.handleDeleteKeyword.bind(this);
  }

  componentWillMount() {
    this.props.fetchKeyword();
  }

  handleOpenKeyword(keyword) {
    this.setState({ editKeywordDialog: true, keyword: keyword.keyword, interval: keyword.interval});
  }

  handleCloseKeyword() {
    this.setState({ editKeywordDialog: false, keyword: '', interval: 0})
  }

  handleEditKeyword() {
    if (this.state.interval >= 1) {
      this.props.patchKeyword(this.state.interval, this.state.keyword);
      this.setState({ editKeywordDialog: false, keyword: '', interval: 0});
    } else {
      alert('Interval cannot be a minus');
    }
  }

  onChangeKeywordInterval(event) {
    this.setState({ interval: event.target.value});
  }

  handleOpenDeleteKeyword(keyword) {
    this.setState({ deleteKeywordDialog: true, keyword: keyword.keyword, interval: keyword.interval});
  }

  handleCloseDeleteKeyword() {
    this.setState({ deleteKeywordDialog: false, keyword: '', interval: 0})
  }

  handleDeleteKeyword() {
    this.props.deleteKeyword(this.state.interval, this.state.keyword);
    this.setState({ deleteKeywordDialog: false, keyword: '', interval: 0});
  }

  render() {
    const getData = () => {
      if (this.props.keyword.length === 0) {
        return;
      }
  
      let rows = this.props.keyword.map((keyword, i) => 
        <tr key={i}>
          <td>{keyword.keyword}</td>
          <td>{keyword.interval}</td>
          <td>
            <a onClick={(e) => this.handleOpenKeyword(keyword)} >Edit</a>
            <Dialog open={this.state.editKeywordDialog} onClose={this.handleCloseKeyword}>
              <DialogTitle>Edit Keyword</DialogTitle>
              <form onSubmit={(e)=>{
                e.preventDefault();
                this.handleEditKeyword();
                e.target.reset();
                }}>
                <DialogContent>
                  <DialogContentText>
                    Edit Interval for Keyword "{this.state.keyword}"?
                  </DialogContentText>
                  <TextField
                    autoFocus
                    label="Interval"
                    type="number"
                    margin="dense"
                    fullWidth
                    onChange={this.onChangeKeywordInterval}
                    value={this.state.interval}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseKeyword}>Cancel</Button>
                  <Button type="submit">Edit</Button>
                </DialogActions>
              </form>
            </Dialog>
            <br/>
            <a onClick={(e)=>{this.handleOpenDeleteKeyword(keyword);}}>Delete</a>
            <Dialog open={this.state.deleteKeywordDialog} onClose={this.handleCloseDeleteKeyword}>
              <DialogTitle>Delete Keyword</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete Keyword "{this.state.keyword}"?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  this.handleDeleteKeyword(keyword);
                  e.target.reset();
                  }}>
                  <Button onClick={this.handleCloseDeleteKeyword}>Cancel</Button>
                  <Button type="submit">Delete</Button>
                </form>
              </DialogActions>
            </Dialog>
          </td>
        </tr>
      );
      return rows;
    }

    return (
      <div>
        <table className="table table-bordered centerTable" style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th>Keyword</th>
              <th>Interval</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getData()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    keyword: state.keyword.keyword
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchKeyword : () => dispatch(fetchKeyword()),
    patchKeyword : (interval, keyword) => dispatch(patchKeyword(interval, keyword)),
    deleteKeyword: (interval, keyword) => dispatch(deleteKeyword(interval, keyword))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(KeywordTable);