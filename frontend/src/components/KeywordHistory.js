import React from 'react';
import SocketContext from '../miscellaneous/SocketContext';

class KeywordHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages : [],
    }
  }

  componentDidMount() {
    this.props.socket.on('mail', (message) => {
	    console.log(`Message : ${message}`);
      this.setState({messages: [...this.state.messages, message]});
    });
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners('mail');
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

const KeywordHistoryWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <KeywordHistory {...props} socket={socket}/>}
  </SocketContext.Consumer>
)

export default KeywordHistoryWithSocket;

