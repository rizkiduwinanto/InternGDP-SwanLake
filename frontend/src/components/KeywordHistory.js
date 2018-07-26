import React from 'react';
import io from 'socket.io-client';
import { API_URL } from '../config';

const socket = io.connect(`${API_URL}`);

class KeywordHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages : [],
    }
  }

  componentDidMount() {
    socket.on('mail', (message) => {
      this.setState({messages: [...this.state.messages, message]});
    });
  }

  render() {
    const getRows = this.state.messages.map((message, i)=> 
      <li key={i} className="list-group-item" >{message}</li>
    );

    return (
      <ul className="list-group mx-auto justify-content-center" style={{maxWidth:'50%', maxHeight: '30vh', overflow: 'auto'}}>
        {this.state.messages.length === 0 ? <li className="list-group-item" >No email sent yet.</li> : getRows}
      </ul>
    );
  }
}

export default KeywordHistory;

