import React, {Component} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import {Text, View, StyleSheet, Image, Button, Dimensions} from 'react-native' 
import {getLocation} from '../../controller/FireBase/App_Firebase_HMT'
import NewMarker from './../Component/Marker'
import FriendList from './../Component/FriendList'
import BottomSheet from './../Component/BottomSheet'

const {height} = Dimensions.get('window')

class App extends Component {

  constructor(props)
  {
    super(props);

    this.state =
    {
      data: [{key: {lat: 8, lon: 100}}]
    };

    this.getLocation = getLocation.bind(this);
  }

  componentDidMount() {
    //this.refs.map.fitToElements(true);
    this.getLocation();
  }

  render() {

    var markerList = []
    var i = 0;
    
    this.state.data.forEach((location) =>
    {
      markerList.push(
        <NewMarker
          key = {i}
          coordinate =
          {
            {
              latitude: parseFloat(location.key.lat),
              longitude: parseFloat(location.key.lon)
            }
          }>

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
          rotateEnabled={true}

          initialRegion={{
            latitude: 10.76291,
            longitude: 106.67997,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          
          {markerList}

          <Marker coordinate={{
              latitude: 10.76291,
              longitude: 106.67997}}
              draggable={true}/>

          </MapView>

          <BottomSheet />

      
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




export default App;