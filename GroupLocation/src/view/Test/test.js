import React,{Component} from 'react'
import {StyleSheet} from 'react-native'
import MapView, { AnimatedRegion, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
//import distance from 'google-distance/test/index.test'
import Signup from '../Login/src/pages/Signup'


const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDTq_odeT5763ZoIkex6xXCBCxtDvPaRaM';


class Directions extends Component {

  

  
  
  render() {
    return (
      <MapView style={{...StyleSheet.absoluteFillObject}}>
        <MapView.Marker.Animated
          ref={marker => { this.marker = marker }}
          //coordinate={this.state.coordinate}
          style = {{transform: [{ rotate: '90deg'}]}}
        />
      </MapView>
    );
  }

}


/*distance.get(
  {
    origin: '-7.841879,110.409193',
    destination: '-7.741194,110.342588'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});*/

export default Directions;