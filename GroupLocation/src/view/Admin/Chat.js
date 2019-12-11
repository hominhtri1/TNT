// GiftedChatWithChatkit/MyChat.js
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default class MyChat extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "I think we passed the first step of the tutorial. We will now need a Pusher account!",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return <GiftedChat 
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)} />;
  }
}