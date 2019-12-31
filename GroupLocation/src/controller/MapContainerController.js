import React, {Component} from 'react'
import User from '../model/user/User'
import MapViewContainer from '../view/mapView/MapViewContainer2'
import MapController from './MapController2'

class MapContrainerController extends Component {

    gotoChat = () => {
        //console.warn('Chat'); 
        this.props.navigation.navigate('Chat')
    }

    gotoFriendProfile = (id) => {
        console.warn("ID" + id)
        this.props.navigation.navigate('FriendProfile', {friendId: id})
    }

    leaveGroup = () => {
        console.warn("Implement leave group here");
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
            <MapViewContainer
                screenProps={{
                    gotoChat: this.gotoChat,
                    leaveGroup: this.leaveGroup,
                    gotoMyProfile: this.gotoMyProfile,
                    gotoCreateGroup: this.gotoCreateGroup,
                    gotoJoinGroup: this.gotoJoinGroup,
                    gotoLogIn: this.gotoLogIn,
                    gotoGroupProfile: this.gotoGroupProfile
                }}>
                
            </MapViewContainer>
        )
    }
}

export default MapContrainerController;


