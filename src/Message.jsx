import React, { Component } from "react";

class Message extends Component {
  render() {
    let userColor = { color: this.props.color };
    return (
      <div className={this.props.type === "incomingMessage" ? "message" : "notification"}>
        <span className="message-username" style={userColor}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  } 
}

export default Message;