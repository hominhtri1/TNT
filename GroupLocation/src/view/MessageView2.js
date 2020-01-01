// GiftedChatWithChatkit/MyChat.js
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default class MessageView extends React.Component {
  
  render() {
    return (
      <GiftedChat 
          messages={this.props.messages}
          onSend={messages => this.props.sendMessage(messages[0])} 
          />
    )
  }
}