import React from 'react';
import io from 'socket.io-client';
import { API_URL } from '../config';

const socket = io.connect(`${API_URL}`);

class KeywordHistory extends React.Component {
  constructor(props) {
    super(props);
    console.dir(socket);
  }

  render() {
    let rows = [];
    socket.on('mail',(data)=>{
      rows.push( <li className="list-group-item" >{data}</li>);
      console.log(data);
    })

    return (
      <ul className="list-group mx-auto justify-content-center" style={{maxWidth:'50%'}}>
        {rows}
      </ul>
    );
  }
}

export default KeywordHistory;

