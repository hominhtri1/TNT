import React, {Component} from 'react'
import GroupProfile from './../view/GroupProfileView'
import User from './../model/user/User'
import {databaseRef} from './../controller/Firebase_Config'

class GroupProfileController extends Component {

    constructor(props)
  {
    super(props);

    this.state =
    {
      groupName: "",
      groupCode: User.getCurrentGroupId(),
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
      databaseRef.child('user').child(userCode).child('username').once('value', snapshot =>
      {
        resolve(snapshot.val().toString());
      })
    })
  }

  componentDidMount()
  {
    databaseRef.child('group').child(this.state.groupCode).once('value', async (snapshot) =>
    {
      var groupName = snapshot.child('name').val().toString();
      this.setState({groupName: groupName})
      

      var items = [];

      var snap = snapshot.child('member')
      var snapKeys = Object.keys(snap.val());

      console.warn("Name: " + groupName);
      console.warn("Key: " + snapKeys);
      console.warn("Le: " + snapKeys.length);

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
      console.warn("State: " + this.state.groupName)
    })
  }

  changeGroupName = (groupNameField) =>
  {
    databaseRef.child('group').once('value', (snapshot) =>
    {
      var found = false;

      snapshot.forEach((group) =>
      {
        var groupName = group.child('name').val().toString();

        if (groupName == groupNameField)
          found = true;
      });

      if (found)
      {
        console.warn("Duplicate group name");
        return;
      }

      var updates = {};

      updates['/group/' + this.state.groupCode + '/name'] = groupNameField;

      databaseRef.update(updates);

      this.setState({groupName: groupNameField});
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
      databaseRef.child('group').child(code).child('name').once('value', (snapshot) =>
      {
        if (snapshot.exists())
          resolve(true);
        else
          resolve(false);
      })
    })
  }

  generateGroupCode = async () =>
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

    databaseRef.child('group').child(this.state.groupCode).once('value', snapshot =>
    {
      console.warn(snapshot.val())
      
      databaseRef.child('group').child(newGroupCode).set(snapshot.val());

      User.setGroupCode(newGroupCode)
    
      var updates = {};

      snapshot.child('member').forEach(member =>
      {
        var memberCode = member.val().toString();

        //console.warn(memberCode)
        value = ""
        databaseRef.child('user').child(memberCode).child('grouplist').on('value', snapshot => {
          value = snapshot.val().toString()
        })
        
        value = value.replace(',' + this.state.groupCode, ',' + newGroupCode)
        updates['/user/' + memberCode + '/grouplist'] = value;

        group = ""
        databaseRef.child('user').child(memberCode).child('group').on('value', snapshot => {
          group = snapshot.val().toString()
        })

        if (group == this.state.groupCode) updates['/user/' + memberCode + '/group'] = newGroupCode;
      })

      databaseRef.update(updates);

      //databaseRef.child('group').child(this.state.groupCode).remove();

      this.setState({groupCode: newGroupCode})
    })
  }

    render() {

        return(
            <GroupProfile
                groupName={this.state.groupName}
                groupCode={this.state.groupCode}
                generateGroupCode={this.generateGroupCode}
                changeGroupName={this.changeGroupName}
                data={this.state.data}/>
        )

    }



}

export default GroupProfileController;