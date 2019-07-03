import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      type: "postMessage",
      username: "",
      content: ""
    };
  }

  handleName = e => {
    this.setState({ username: e.target.value });
  }

  handleMessage = e => {
    this.setState({ content: e.target.value });
  }

  handleSubmitMessage = e => {
    if (e.key === 'Enter') {
      this.props.submitMessage(this.state);
      this.setState({ content: "" });
    }
  }

  handleUpdateName = e => {
    this.props.submitNotification(e.target.value)
  }

  render() {
    return (
      <footer className="chatbar" onKeyPress={this.handleSubmitMessage}>
        <input className="chatbar-username" value={this.state.username} onChange={this.handleName} onBlur={this.handleUpdateName} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" value={this.state.content} onChange={this.handleMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;