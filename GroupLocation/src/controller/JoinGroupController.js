import React, {Component} from 'react'
import {Alert} from 'react-native'
import ListGroup from '../view/JoinGroupView'
import User from '../model/user/User'
import Group from '../model/group/Group'
import {NavigationActions} from 'react-navigation'

class JoinGroupController extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        this.getGroups();
    }

    getGroups = () => {
        Group.getGroupList(this.setGroups);
    }

    setGroups = (groups) => {
        this.setState({data: groups})
    }

    joinGroup = (code) => {
        
        Group.checkExitGroup(code, this.joinGroupFail, this.joinGroupSuccess);
    }

    joinGroupFail = () => {
        Alert.alert("There is no group exits");
    }

    joinGroupSuccess = () => {
        Alert.alert("Join Group Success! Now you can go to new group");
    }

    gotoNewGroup = (id) => {
        User.setNewGroup(id, this.realGotoNewGroup)
        
    }

    realGotoNewGroup = () => {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Map'},)], 0);
    }

    render() {
        return(
            <ListGroup
                groups={this.state.data}
                joinGroup={this.joinGroup}
                gotoNewGroup={this.gotoNewGroup}/>
        )
    }

}

export default JoinGroupController;