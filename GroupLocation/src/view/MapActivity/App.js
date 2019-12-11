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
      data: [{id: 0, key: {lat: 8, lon: 100}, isHightlight: false}],
      locationCoor: {
        latitude: 10.76291,
        longitude: 106.67997
      },
      placeMarker: true
    };

    this.getLocation = getLocation.bind(this);
  }

  componentDidMount() {
    this.refs.map.fitToElements(true);
    this.getLocation();
    
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

    if (this.state.placeMarker) {
      this.setState({locationCoor: coor})
    }

  }

  toggleLocationButton = () => {
    this.setState({placeMarker: !this.state.placeMarker})
  }

  render() {

    var markerList = []
    var i = 0;
    
    console.warn(this.state.data)

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
          
          {markerList}

          <Marker 
              coordinate={this.state.locationCoor}
              draggable={true}
              onDragEnd={e => {this.setState({locationCoor: e.nativeEvent.coordinate})}}/>

          </MapView>

          <BottomSheet
              toggleLocationButton={this.toggleLocationButton}
              higltlight={this.setHightlight} />

      
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