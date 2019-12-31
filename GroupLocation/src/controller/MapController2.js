import React, {Component} from 'react'
import GroupMember from '../model/user/GroupMember'
import MapView from './../view/mapView/MapView2'
import Geolocation from '@react-native-community/geolocation';

class MapController extends Component {

    constructor(props) {
        
        super(props);

        this.state = {

            friendPosList: [{id: 0, key: {lat: 8, lon: 100}, isHightlight: false, url: ""}],
            locationCoor: {
                latitude: 10.76291,
                longitude: 106.67997,
                visible: true
            },
            exlocationCoor: {
                latitude: 10.76291,
                longitude: 106.67997,
                visible: true
            },
            userCoor: {
                latitude: 10.76291,
                longitude: 106.67997,
                url: ""
            },
            placeMarker: true,
        };

    }

    componentDidMount() {
        GroupMember.getGroupMembersLocation(this.setFriendListAndUser);
        GroupMember.getMeetingPointLocation(this.setMeetingPointCoor);
    }

    setFriendListAndUser = (data, userData) => {
        console.warn(userData)
        this.setState({friendPosList: data, userCoor: userData
        })
    }

    getCurrentLocation = () => {

        Geolocation.watchPosition(info => {
          this.setState({userCoor: {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            url: this.state.userCoor.url
          }})
          
          User.updatePosition(info.coords.latitude, info.coords.longitude)
        })
    }

    setMeetingPointCoor = (data) => {
        console.warn("Data " + data)
        this.setState({locationCoor: data})
    }

    updateMeetingPoint = (info) => {
        GroupMember.updateMeetingPoint(info);
    }

    toggleSetMarker = () => {

        this.updateMeetingPoint({
            latitude: this.state.locationCoor.latitude,
            longitude: this.state.locationCoor.longitude,
            visible: !this.state.locationCoor.visible
        })
        
    }

    mapPress = (coor) => {

        if (this.state.locationCoor.visible) {
          
            this.updateMeetingPoint({
                latitude: coor.latitude,
                longitude: coor.longitude,
                visible: true
            })
        }
    
    }

    render() {

        return(
            <MapView
                userCoor={this.state.userCoor}
                friendPosList={this.state.friendPosList}
                locationCoor={this.state.locationCoor}
                mapPress={this.mapPress}
                toggleSetMarker={this.toggleSetMarker}>
                {this.props.children}
            </MapView>
        )
    }

}

export default MapController;


