import React, { Component } from "react";
import Message from "./Message.jsx"

class MessageList extends Component {
  render() {
    const messageList = this.props.messages.map(message => {
      return (
        <Message
          type={message.type}
          color={message.color}
          key={message.id}
          username={message.username}
          content={message.content} />
      );
    });
    return (
      <main className="messages">
        { messageList }
      </main>
    );
  }
}

export default MessageList;