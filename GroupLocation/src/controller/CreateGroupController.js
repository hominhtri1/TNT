import React, {Component} from 'react'
import CreateGroup from './../view/CreateGroupView'
import User from './../model/user/User'
import {Alert} from 'react-native'
import {NavigationActions} from 'react-navigation'

class CreateGroupController extends Component {

    createNewGroup = (code) => {
        User.createNewGroup(code, this.gotoNewGroup);
    }

    gotoNewGroup = (code, key) => {

        Alert.alert(
            'Alert Title',
            `Do you want to go to ${code} group ?`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.realyGotoNewGroup(key)},
            ],
            {cancelable: false},
          );
    }

    realyGotoNewGroup = (key) => {

        User.getNewGroup(this.goto, key);   
    }

    goto = () => {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Map' },)], 0)
    }





    render() {
        return(
            <CreateGroup
                createNewGroup={this.createNewGroup}/>
        )
    }


}

export default CreateGroupController;