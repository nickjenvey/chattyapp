import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

const ws = new WebSocket("ws://localhost:3001");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      numberOfUsers: 0,
      messages: []
    };
  }

  componentDidMount() {
    ws.onopen = () => {
      console.log("Connected to server");
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      switch(data.type) {
        case "incomingMessage":
          this.addMessage(data);
          break;
        
        case "incomingNotification":
          this.addMessage(data);
          break;
        
        case "users":
          this.numberOfUsers(data.numberOfUsers);
          this.userColor(data.color);
          break;
      }
    }
  }

  userColor = (color) => {
    this.setState({ color: color });
  }
  
  numberOfUsers = (numberOfUsers) => {
    this.setState({ numberOfUsers: numberOfUsers });
  }

  addMessage = (message) => {
    const messages = this.state.messages.concat(message);
    this.setState({ messages: messages });
  }

  submitMessage = (message) => {
    message.color = this.state.color;
    ws.send(JSON.stringify(message));
  }

  submitNotification = (newName) => {
    // Check if newName is empty
    if (!newName) {
      newName = "Anonymous";
    };

    let oldName = this.state.username

    // Check if olderusername is empty
    if (!oldName) {
      oldName = "Anonymous";
    };

    const notification = {
      type: "postNotification",
      content: `${oldName} changed their name to ${newName}`
    }
    this.setState({ username: newName });
    ws.send(JSON.stringify(notification));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">{this.state.numberOfUsers} users online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar submitMessage={this.submitMessage} submitNotification={this.submitNotification} />
      </div>
    );
  }
}

export default App;