import React from 'react';
import io from 'socket.io-client';
import { API_URL } from '../config';

const socket = io.connect('http://0.0.0.0:3002');

class KeywordHistory extends React.Component {
  constructor(props) {
    super(props);
    console.dir(socket);
  }

  render() {
    let rows = [];
    socket.on('mail', (message) => {
      rows.push( <li className="list-group-item" >{message}</li>);
      console.log(message);
    });

    return (
      <ul className="list-group mx-auto justify-content-center" style={{maxWidth:'50%'}}>
        {rows.length === 0 ? <li className="list-group-item" >No email sent yet.</li> : rows}
      </ul>
    );
  }
}

export default KeywordHistory;

