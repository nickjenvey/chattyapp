import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: "",
      message: ""
    };
  }

  handleName = e => {
    this.setState({
      user: e.target.value
    });
  }

  handleMessage = e => {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmitMessage = e => {
    if (e.key === 'Enter') {
      this.props.submitMessage(this.state);
      this.setState({
        message: ""
      });
    }
  }

  render() {
    return (
      <footer className="chatbar" onKeyPress={this.handleSubmitMessage}>
        <input className="chatbar-username" value={this.state.user} onChange={this.handleName} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" value={this.state.message} onChange={this.handleMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;