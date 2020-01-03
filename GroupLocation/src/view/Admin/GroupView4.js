import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

class GroupView extends Component
{
  constructor(props)
  {
    super(props);

    this.databaseRef = this.props.navigation.getParam('dataRef', "");
    var groupCode = this.props.navigation.getParam('groupCode', "");

    this.state =
    {
      groupName: "",
      groupCode: groupCode,
      groupNameField: "",
      data: [
      {
        key: "txt",
        username: "txt"
      }]
    }
  }

  getUser(userCode)
  {
    return new Promise(resolve =>
    {
      this.databaseRef.child('user').child(userCode).child('username').once('value', snapshot =>
      {
        resolve(snapshot.val().toString());
      })
    })
  }

  componentDidMount()
  {
    this.databaseRef.child('group').child(this.state.groupCode).once('value', async (snapshot) =>
    {
      var groupName = snapshot.child('name').val().toString();

      var items = [];

      var snap = snapshot.child('member')
      var snapKeys = Object.keys(snap.val());

      console.warn(snapKeys);

      for (var i = 0; i < snapKeys.length; ++i)
      {
        var memberCode = snap.child(snapKeys[i]).val().toString();

        var memberName = await this.getUser(memberCode);

        items.push(
        {
          key: memberCode,
          username: memberName,
        });
      }

      this.setState({groupName: groupName, data: items});
    })
  }

  changeGroupName()
  {
    this.databaseRef.child('group').once('value', (snapshot) =>
    {
      var found = false;

      snapshot.forEach((group) =>
      {
        var groupName = group.child('name').val().toString();

        if (groupName == this.state.groupNameField)
          found = true;
      });

      if (found)
      {
        console.warn("Duplicate group name");
        return;
      }

      var updates = {};

      updates['/group/' + this.state.groupCode + '/name'] = this.state.groupNameField;

      this.databaseRef.update(updates);

      this.setState({groupName: this.state.groupNameField});
    })
  }

  generateRandomCode()
  {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    var result = '';

    for ( var i = 0; i < 7; i++ )
      result += characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
  }

  checkCodeDuplicate(code)
  {
    return new Promise(resolve =>
    {
      this.databaseRef.child('group').child(code).child('name').once('value', (snapshot) =>
      {
        if (snapshot.exists())
          resolve(true);
        else
          resolve(false);
      })
    })
  }

  async generateGroupCode()
  {
    var newGroupCode = "";

    while (true)
    {
      var randomCode = this.generateRandomCode();

      var duplicate = await this.checkCodeDuplicate(randomCode);

      if (!duplicate)
      {
        newGroupCode = randomCode;
        break;
      }
    }

    this.databaseRef.child('group').child(this.state.groupCode).once('value', snapshot =>
    {
      this.databaseRef.child('group').child(newGroupCode).set(snapshot.val());

      var updates = {};

      snapshot.child('member').forEach(member =>
      {
        var memberCode = member.val().toString();

        updates['/user/' + memberCode + '/group'] = newGroupCode;
      })

      this.databaseRef.update(updates);

      this.databaseRef.child('group').child(this.state.groupCode).remove();

      this.setState({groupCode: newGroupCode})
    })
  }

  render()
  {
    return (
      <View>
        <View>
          <Text>
            Group Name: {this.state.groupName}
          </Text>

          <TextInput
            placeholder = "Enter new group name here"
            onChangeText = {(text) => {this.setState({groupNameField: text})}}
          />

          <Button
            title = "Change group name"
            onPress = {() => {this.changeGroupName()}}
          />
        </View>
        
        <View>
          <Text>
            Group Code: {this.state.groupCode}
          </Text>

          <Button
            title = "Generate new group code"
            onPress = {() => {this.generateGroupCode()}}
          />
        </View>

        <View>
          <Text>
            Member list:
          </Text>
          
          <FlatList
            data = {this.state.data}

            renderItem = {({item}) => (
              <Text>{item.username}</Text>
            )}
          />
        </View>
      </View>
    )
  }
}

export default GroupView