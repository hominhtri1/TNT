import React, {Component} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import {Text, View, StyleSheet, Image, Button, Dimensions} from 'react-native' 
//import {getLocation} from '../../controller/FireBase/App_Firebase_HMT'
import NewMarker from '../Component/NewMarker'
import FriendList from './../Component/FriendList'
import BottomSheet from './../Component/BottomSheet'
import mapController from './../../controller/MapController'
import MapController from './../../controller/MapController';
import Geolocation from '@react-native-community/geolocation';
import {databaseRef} from './../../controller/Firebase_Config'

const {height} = Dimensions.get('window')

class MapViews extends Component {

  constructor(props)
  {
    super(props);

    //databaseRef = this.props.navigation.getParam('dataRef', null);
    var key = this.props.key;
    console.warn("Key " + key)

    this.state =
    {
      data: [{id: 0, key: {lat: 8, lon: 100}, isHightlight: false}],
      locationCoor: {
        latitude: 10.76291,
        longitude: 106.67997
      },
      userCoor: {
        latitude: 10.76291,
        longitude: 106.67997
      },
      placeMarker: true,
      visible: true,
      groupList: []
    };

    //this.getLocation = getLocation.bind(this);
    this.mapController = new MapController(this)
  }

  componentDidMount() {
    this.refs.map.fitToElements(true);
    //this.getLocation();
    //this.props.navigation.setParams({ increaseCount: this._increaseCount });
    this.getFriendList()
    this.getLocation()

    Geolocation.getCurrentPosition(info => {
      this.setState({userCoor: {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
      }})
      this.userPositionConfig()
    })


    Geolocation.watchPosition(info => {
      this.setState({userCoor: {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
      }})
      this.userPositionConfig()
    })  

  }

  getLocation = () => {

    if (this.props.group == "") return;

    databaseRef.child('group').child(this.props.group).child("meetingpoint").on('value', snapshot => {
      //console.warn("Snapshot " + snapshot.child('longitude').val())
      this.setState({locationCoor: {
        latitude: snapshot.child('latitude').val(),
        longitude: snapshot.child('longitude').val()
      }})
    })

  }

  updateMeetingPoint = (coor) => {

    if (this.props.group == "") return;

    databaseRef.child('group').child(this.props.group).child("meetingpoint").set({
      latitude: coor.latitude,
      longitude: coor.longitude
    })


  }



  userPositionConfig = () => {

    databaseRef.child('user').child(key).child('latitude').set(this.state.userCoor.latitude)
    databaseRef.child('user').child(key).child('longitude').set(this.state.userCoor.longitude);
  }

  getFriendList = () => {

    console.warn("Get friend");

    if (this.props.group == "") return;
    
    groupKey = this.props.group
    databaseRef.child('user').on('value', (snapshot) => {

      var items = [];

      snapshot.forEach((child) =>
      {
        if (child.child('grouplist').val().toString().includes(groupKey) && child.key != key) {
        
          var childKey = child.key;
          var latitude = child.child('latitude').val().toString();
          var longitude = child.child('longitude').val().toString();

          items.push(
          {
            id: childKey, 
            key: {
              lat: latitude, 
              lon: longitude
            }, 
            isHightlight: false
          });
        }
      })
      

      this.setState({data: items});


    })

    
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
    //console.warn("Visible");
    //this.mapController.setMarker()
  }

  gotoFriendProfile = (id) => {
    console.warn(id)
    this.props.navigation.navigate("FriendProfile", {friendId: id})
  }

  checkLocation = () => {
    if (this.state.visible) {
      return(
        <Marker 
            visible={this.state.visible}
            coordinate={this.state.locationCoor}
            draggable={true}
            onDragEnd={e => {//this.setState({locationCoor: e.nativeEvent.coordinate})
                              this.updateMeetingPoint(e.nativeEvent.coordinate)
          }}/>
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
          visible = {this.state.visible}
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
          //showsUserLocation={true}
          //showsMyLocationButton={true}
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

          <NewMarker
            isHightlight = {false}
            key = {100}
            visible = {this.state.visible}
            coordinate = {this.state.userCoor}
            HLCoordinate = {this.state.locationCoor} />

          {this.checkLocation()}

          {markerList}
          
        </MapView>

        <BottomSheet
            toggleLocationButton={this.toggleLocationButton}
            setLocationButton={this.mapController.setMarker}>

            <FriendList 
                data={this.state.data}
                setHightlight={this.setHightlight}
                gotoFriendProfile={this.props.gotoFriendProfile}
                {...this.props}/>

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