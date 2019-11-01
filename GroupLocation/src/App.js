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
        //10.762913,106.6799776
      >
        
        <Marker 
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324
          }}
          title="SOme thung title"
          
          //image={require("./Resource/Image/b0a921ba-27ff-11e7-b1ad-cac091044fd5_VJUZ.jpg")}
        >
          <Image 
            source={require("./../resource/Image/b0a921ba-27ff-11e7-b1ad-cac091044fd5_VJUZ.jpg")} style={{ width: 40, height: 40 }} 
          />
        </Marker>


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