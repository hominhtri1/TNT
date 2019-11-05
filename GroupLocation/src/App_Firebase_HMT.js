import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from 'firebase';
import MapView, {Marker} from 'react-native-maps';

var firebaseConfig =
{
    apiKey: "AIzaSyBN2mPxRRzixqg3nPgkucB0yUSs43j39zI",
    authDomain: "my-expo-project-baa1f.firebaseapp.com",
    databaseURL: "https://my-expo-project-baa1f.firebaseio.com",
    projectId: "my-expo-project-baa1f",
    storageBucket: "my-expo-project-baa1f.appspot.com",
    messagingSenderId: "1082063247227",
    appId: "1:1082063247227:web:318b5e512c49c535c94fde"
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
        <Marker
          key = {i}
          coordinate =
          {
            {
              latitude: parseFloat(location.key.lat),
              longitude: parseFloat(location.key.lon)
            }
          }>

        </Marker>
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
