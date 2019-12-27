// GiftedChatWithChatkit/MyChat.js
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default class MessageView extends React.Component {
  
  sendMessage(message) {

    this.databaseRef.child('group').child(this.group).child('message').push().set(
        {
          _id: message._id,
          text: message.text,
          createdAt: message.createdAt.toString(),
          user: {
            _id: this.key,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
    )
  }
  
  constructor(props)
  {
    super(props);

    this.databaseRef = this.props.navigation.getParam('dataRef', null);
    this.key = this.props.navigation.getParam('personKey', null);
    this.group = this.props.navigation.getParam('groupKey', null);
    this.user = this.props.navigation.getParam('username', null);

    //test group key

    this.state =
    {
      messages: [],
      data: [
      {
        key: "0",
        user: "0",
        text: "empty"
      }],

      text: ""
    };
  }

  componentDidMount()
  {
    this.databaseRef.child('group').child(this.group).child('message').on('value', (snapshot) =>
    {
      var items = [];

      snapshot.forEach(child =>
      {
        //var childKey = child.key;
        var _id = child.child('_id').val().toString();
        var _userId = child.child('user').child('_id').val().toString()

        var user = {
            _id: _userId,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
        }
        var text = child.child('text').val().toString();
        var date = new Date(child.child('createdAt').val().toString())
        
        if (_userId == this.key) {
            user = {}
        }


        items.push(
        {
          _id: _id,
          text: text,
          createdAt: date,
          user: user
        });
      });

      //console.warn("Message " + items)
      this.setState({messages: items.reverse()})
    })
  }

  render() {
    return <GiftedChat 
            messages={this.state.messages}
            onSend={messages => this.sendMessage(messages[0])} 
            />;
  }
}