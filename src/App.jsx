import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

const URL = "ws://localhost:3001";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("Connected to server");
    }

    this.ws.onmessage = e => {
      const message = JSON.parse(e.data);
      this.addMessage(message);
    }
  }

  addMessage = message => {
    const messages = this.state.messages.concat(message);
    this.setState({ messages: messages });
  }

  submitMessage = message => {
    this.ws.send(JSON.stringify(message))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar submitMessage={this.submitMessage} />
      </div>
    );
  }
}

export default App;