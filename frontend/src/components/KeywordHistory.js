import React from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:3001');

class KeywordHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
    console.dir(socket);
  }

  render() {
    let rows = [];
    socket.on('mail',(data)=>{
      rows.push(data);
    })

    return (
      <ul className="list-group mx-auto justify-content-center" style={{maxWidth:'50%'}}>
        {rows}
      </ul>
    );
  }
}

export default KeywordHistory;

