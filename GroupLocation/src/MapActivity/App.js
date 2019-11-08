import React,{Component} from 'react'
import MapView, {Marker} from 'react-native-maps';
import {Text, View, StyleSheet, Image} from 'react-native' 








class App extends Component {

  render() {
    return(
      <MapView
        style = {styles.view}
        initialRegion={{
          latitude: 10.76291,
          longitude: 106.67997,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

      
        
       
      </MapView>
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