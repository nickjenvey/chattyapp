import React, { Component } from "react";
import Message from "./Message.jsx"

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messageItems = props.messages.map((username, content) => {
      
    });
    return (
      <main className="messages">
        <Message />
      </main>
    );
  }
}

export default MessageList;