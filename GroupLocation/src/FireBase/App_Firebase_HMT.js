import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import NewMarker from '../Component/Marker';
//import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.3318456, longitude: -122.0296002};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDzHXX6tJj84BC7vUs48kMKOJwIeH7luJc';

var firebaseConfig =
{
    apiKey: "AIzaSyCkM4CP1G7FXs0wHRvDjcbVsxi-wJDtJrI",
    authDomain: "tnt-project-f091c.firebaseapp.com",
    databaseURL: "https://tnt-project-f091c.firebaseio.com",
    projectId: "tnt-project-f091c",
    storageBucket: "tnt-project-f091c.appspot.com",
    messagingSenderId: "405293507150",
    appId: "1:405293507150:web:70b781fee71cf4412fd91f"
};

var firebaseApp = firebase.initializeApp(firebaseConfig);

var databaseRef = firebaseApp.database().ref();

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state =
    {
      data: [{key: {lat: 8, lon: 100}}]
    };
  }

  componentDidMount()
  {
    databaseRef.on('value', (snapshot) =>
    {
      var items = [];

      snapshot.forEach((child) =>
      {
        var latitude = child.child('latitude').val().toString();
        var longitude = child.child('longitude').val().toString();

        items.push({key: {lat: latitude, lon: longitude}});
      })

      this.setState({data: items});
    })
  }

  render()
  {
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

    return (
      <MapView
        style = {styles.view}
        initialRegion =
        {
          {
            latitude: 10.76291,
            longitude: 106.67997,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }>
        

        {markerList}

      </MapView>
    )
  };
}

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22
  },
  item:
  {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  view:
  {
    flex: 1
  }
});
