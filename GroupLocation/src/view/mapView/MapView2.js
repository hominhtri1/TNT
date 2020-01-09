import React, {Component} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import {Text, View, StyleSheet, Image, Button, Dimensions} from 'react-native' 
//import {getLocation} from '../../controller/FireBase/App_Firebase_HMT'
import NewMarker from '../Component/NewMarker'
import FriendList from './FriendListView'
import BottomSheet from './../Component/BottomSheet'
import mapController from './../../controller/MapController'
import MapController from './../../controller/MapController';
import Geolocation from '@react-native-community/geolocation';
import {
  databaseRef,
  storageRef
} from './../../controller/Firebase_Config'

import FriendListController from './../../controller/FriendListController'

class MapViews extends Component {

  constructor(props)
  {
    super(props);

    this.state = { placeMarker: true };
  }

  componentDidMount() {
    this.refs.map.fitToElements(true);
  }

  setHightlight = (id) => {
    
    console.warn("Hightlight");
    newData = this.state.data.map((data) => {
      if (data.id == id) 
        data.isHightlight = !data.isHightlight
      return data
    })

    this.setState({data: newData})
  }

  // UI Realte
  toggleLocationButton = () => {
    this.setState({placeMarker: !this.state.placeMarker})
  }

  //UI Realte
  checkLocation = () => {
    
    if (this.props.locationCoor.visible) {
      return(
        <Marker 
            visible={this.props.locationCoor.visible}
            coordinate={this.props.locationCoor}
            draggable={true}
            onDragEnd={e => {//this.setState({locationCoor: e.nativeEvent.coordinate})
                              this.props.updateMeetingPoint(e.nativeEvent.coordinate)}}
        />
      )
    }
    else return null
  }

  userRender() {

    return(

      <NewMarker
            isHightlight = {false}
            key = {100}
            visible = {this.props.locationCoor.visible}
            coordinate =
            {
              {
                latitude: parseFloat(this.props.userCoor.latitude),
                longitude: parseFloat(this.props.userCoor.longitude)
              }
            }
            HLCoordinate = {this.props.locationCoor}
            url={this.props.userCoor.url} />



    )

      


  }

  render() {

    var markerList = []
    
    this.props.friendPosList.forEach((data) =>
    {
      console.warn(data)
      markerList.push(
        <NewMarker
          isHightlight = {data.isHightlight}
          key = {data.id}
          visible = {this.props.locationCoor.visible}
          coordinate =
          {
            {
              latitude: parseFloat(data.key.lat),
              longitude: parseFloat(data.key.lon)
            }
          }
          HLCoordinate={this.props.locationCoor}
          url={data.url}>

        </NewMarker>
      );

    })

    return(
      <View style={mapContainerStyles}>
      
        <MapView
          ref="map"

          style={styles.map}
          initialRegion={{
            latitude: 10.76291,
            longitude: 106.67997,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={e => {
              if (this.state.placeMarker) 
                  this.props.mapPress(e.nativeEvent.coordinate)
          }}
        >

          {this.userRender()}
          {this.checkLocation()}
          {markerList}
          
          </MapView>

          <BottomSheet
            toggleLocationButton={this.toggleLocationButton}
            setLocationButton={this.props.toggleSetMarker}>
            
            {this.props.children}

        </BottomSheet>
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',

  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

const mapContainerStyles = StyleSheet.flatten({
  ...StyleSheet.absoluteFillObject,
          
});

export default MapViews;