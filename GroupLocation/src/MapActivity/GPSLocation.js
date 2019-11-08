import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

class myPosition{

static longitude : null;
static latitute : null;
static altitude : null;
static accuracy : null;
static heading : null;
static speed : null;

static updateLocation(){
Geolocation.getCurrentPosition(
            (position) => {
this.longitude = position.coords.longitude;                 this.latitude = position.coords.latitude;
this.altitude = position.coords.altitude;
this.accuracy = position.coords.accuracy; 
this.heading = position.coords.heading;
this.speed = position.coords.speed;
            },
            (error) => {}
            ,
            { enableHighAccuracy: true }
        );
}

static getLongitude(){
	this.updateLocation();
	return this.longitude;
}

static getLatitude(){
	this.updateLocation();
	return this.latitude;
}

static getAltitude(){
	this.updateLocation();
	return this.altitude;
}

static getAccuracy(){
	this.updateLocation();
	return this.accuracy;
}

static getHeading(){
	this.updateLocation();
	return this.heading;
}

static getSpeed(){
	this.updateLocation();
	return this.speed;
}


}

async function requestLocationPermission() {

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This app needs to access your location',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

}


export default class HelloWorldApp extends Component {

state = { longitude : null, latitute : null, altitude : null, accuracy : null, heading : null, speed : null, time : null, error : "No error", cycle : 0};

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Longitude : {myPosition.getLongitude()}</Text>
        <Text>Latitude : {myPosition.getLatitude()}</Text>
        <Text>Altitude : {myPosition.getAltitude()}</Text>
        <Text>Accuracy : {myPosition.getAccuracy()}</Text>
        <Text>Heading : {myPosition.getHeading()}</Text>
        <Text>Speed : {myPosition.getSpeed()}</Text>
        <Text>Time : {this.state.time}</Text>
        <Text>Error : {this.state.error}</Text>
        <Text>Cycle : {this.state.cycle}</Text>
      </View>
    );
  }

componentDidMount() {

requestLocationPermission() 

setInterval(()=>(
            Geolocation.getCurrentPosition(
            (position) => {
                this.setState(myState => (
        { longitude : position.coords.longitude, latitude : position.coords.latitude, altitude : position.coords.altitude, accuracy : position.coords.accuracy, heading : position.coords.heading, speed : position.coords.speed, time : position.timestamp, cycle : myState.cycle + 1 }
      ));
            },
            (error) => {
                this.setState(myState => (
        { error : error.message, cycle : myState.cycle + 1}
      ));
            },
            { enableHighAccuracy: true }
        )),1000);

}

}
