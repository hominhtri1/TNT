import React, {Component} from 'react'
import MapView, {Marker} from 'react-native-maps';
import {Text, View, StyleSheet, Image} from 'react-native' 
import {getLocation} from './../FireBase/App_Firebase_HMT'
import NewMarker from './../Component/Marker'
import FriendList from './../Component/FriendList'


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
      <View style={styles.view}>
      
        <MapView
          style = {styles.view}
          initialRegion={{
            latitude: 10.76291,
            longitude: 106.67997,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
      
        {markerList}
      
      
        </MapView>
        <FriendList data={this.state.data} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
      flex: 1,
      fontSize: 100

  }
})




export default App;