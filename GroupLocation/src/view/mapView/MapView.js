import React, {Component} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import {Text, View, StyleSheet, Image, Button, Dimensions} from 'react-native' 
import {getLocation} from '../../controller/FireBase/App_Firebase_HMT'
import NewMarker from '../Component/NewMarker'
import FriendList from './../Component/FriendList'
import BottomSheet from './../Component/BottomSheet'
import { Icon, Container, Content, Header, Body, Left, Right} from 'native-base'

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'

const {height} = Dimensions.get('window')

class MapViews extends Component {

  constructor(props)
  {
    super(props);

    this.state =
    {
      data: [{id: 0, key: {lat: 8, lon: 100}, isHightlight: false}],
      locationCoor: {
        latitude: 10.76291,
        longitude: 106.67997
      },
      placeMarker: true,
      visible: true
    };

    this.getLocation = getLocation.bind(this);
  }

  componentDidMount() {
    this.refs.map.fitToElements(true);
    this.getLocation();
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
    
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

  mapPress = (coor) => {

    if (this.state.placeMarker && this.state.visible) {
      this.setState({locationCoor: coor})
    }

  }

  toggleLocationButton = () => {
    this.setState({placeMarker: !this.state.placeMarker})
  }

  setLocationButton = () => {
    this.setState({visible: !this.state.visible})
  }

  gotoFriendProfile = () => {
    this.props.navigation.navigate("FriendProfile")
  }

  checkLocation = () => {
    if (this.state.visible) {
      return(
        <Marker 
            visible={this.state.visible}
            coordinate={this.state.locationCoor}
            draggable={true}
            onDragEnd={e => {this.setState({locationCoor: e.nativeEvent.coordinate})}}/>
      )
    }
    else return null
  }

  render() {

    var markerList = []
    var i = 0;
    
    this.state.data.forEach((location) =>
    {
      //console.warn(this.state.data)
      markerList.push(
        <NewMarker
          isHightlight = {this.state.data[i].isHightlight}
          key = {i}
          coordinate =
          {
            {
              latitude: parseFloat(location.key.lat),
              longitude: parseFloat(location.key.lon)
            }
          }
          HLCoordinate={this.state.locationCoor}>

        </NewMarker>
      );

      i += 1;
    })

    return(
      <View style={mapContainerStyles}>
      
        <MapView
          ref="map"

          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          rotateEnabled={false}

          initialRegion={{
            latitude: 10.76291,
            longitude: 106.67997,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={e => {this.mapPress(e.nativeEvent.coordinate)}}
        >
          {this.checkLocation()}
          {markerList}

          

          </MapView>

          <BottomSheet
              toggleLocationButton={this.toggleLocationButton}
              setLocationButton={this.setLocationButton}
              >
              <FriendList 
                  data={this.state.data}
                  setHightlight={this.setHightlight}
                  gotoFriendProfile={this.props.gotoFriendProfile}
                  {...this.props}
                />

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