import React, { Component } from 'react';
import { View, FlatList, TextInput, Button, Text } from 'react-native';

class MessageView extends Component
{
  sendMessage()
  {
    this.databaseRef.child('group').child(this.group).child('message').push().set(
    {
      text: this.state.text,
      user: this.user
    })
  }
  
  constructor(props)
  {
    super(props);

    this.databaseRef = this.props.navigation.getParam('dataRef', null);
    this.key = this.props.navigation.getParam('personKey', null);
    this.group = this.props.navigation.getParam('groupKey', null);
    this.user = this.props.navigation.getParam('username', null);

    this.state =
    {
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
        var childKey = child.key;
        var user = child.child('user').val().toString();
        var text = child.child('text').val().toString();

        items.push(
        {
          key: childKey,
          user: user,
          text: text
        });
      });

      this.setState({data: items})
    })
  }

  render()
  {
    return (
      <View>
        <FlatList
          data = {this.state.data}

          renderItem = {({item}) => (
            <View>
              <Text>{'user: ' + item.user}</Text>
              <Text>{'text: ' + item.text}</Text>
              <Text>{' '}</Text>
            </View>
          )}
        />

        <TextInput
          placeholder = "Enter message here"
          onChangeText = {(text) => {this.setState({text})}}
        />

        <Button
          title = "Send Message"
          onPress = {() => {this.sendMessage()}}
        />
      </View>
    )
  }
}

export default MessageView;
