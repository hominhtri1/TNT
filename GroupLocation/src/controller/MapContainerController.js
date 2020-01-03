import React, {Component} from 'react'
import User from '../model/user/User'
import MapContainers from '../view/mapView/MapViewContainer2'
import MapController from './MapController2'

import {NavigationActions} from 'react-navigation'

class MapContrainerController extends Component {

    constructor(props) {
        super(props)
        console.warn(this.props.children)
    }

    gotoChat = () => {
        //console.warn('Chat'); 
        this.props.navigation.navigate('Chat')
    }

    leaveGroup = () => {
        console.warn("Implement leave group here");
        User.leaveGroup(this.gotoMap);
        
    }

    gotoMap = () => {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Map' },)], 0);
    }


    gotoMyProfile = () => {
        this.props.navigation.navigate('MyProfile')
    }

    gotoCreateGroup = () => {
        this.props.navigation.navigate('CreateGroup');
    }

    gotoJoinGroup = () => {
        //props.navigation.navigate('JoinGroup')
        this.props.navigation.navigate('JoinGroup');
    }

    gotoLogIn = () => {
        this.props.navigation.navigate('SignIn')
    }

    gotoGroupProfile = () => {
        console.warn("Only leader can have this")
    }

    render() {
        return(
            <MapContainers
                screenProps={{
                    gotoChat: this.gotoChat,
                    leaveGroup: this.leaveGroup,
                    gotoMyProfile: this.gotoMyProfile,
                    gotoCreateGroup: this.gotoCreateGroup,
                    gotoJoinGroup: this.gotoJoinGroup,
                    gotoLogIn: this.gotoLogIn,
                    gotoGroupProfile: this.gotoGroupProfile,
                    chilren: this.props.children
                }}>
            </MapContainers>
        )
    }
}

export default MapContrainerController;


