import React, {Component} from 'react';
import Container from '../../components/Container';
import Label from '../../components/Label';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Button, Icon, Input} from '../../components';
import {Images, argonTheme} from '../../constants';
import {green} from 'ansi-colors';
const {width, height} = Dimensions.get('screen');

//import Icon from 'react-native-vector-icons/FontAwesome';

import * as firebase from 'firebase';

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

export default class Signin extends Component
{
  signUp()
  {
    /*var found = false;

    this.state.data.forEach(person =>
    {
      if (person.key.user == this.state.user)
        found = true;
    })

    if (found)
    {
      console.warn("Duplicate username");
      return;
    }

    databaseRef.child('user').push().set(
    {
      group: "",
      password: this.state.pass,
      username: this.state.user
    });

    console.warn('Signed up');

    /*
    databaseRef.child('user').push().set(
    {
      latitude: 69.69,
      longitude: 420,
      password: this.state.pass,
      username: this.state.user
    })
    */

    this.props.navigation.navigate('SignUp', {dataRef: databaseRef})
    //this.props.navigation.navigate('Map', , personKey: key});
  };

  signIn()
  {
    var found = false;
    var key = "";

    this.state.data.forEach(person =>
    {
      if (person.user == this.state.user && person.pass == this.state.pass)
      {
        found = true;
        key = person.key;
      }
    })

    if (found)
      this.props.navigation.navigate('Map', {dataRef: databaseRef, personKey: key});
    else 
    {
      Alert.alert("Wrong username or password")
      //console.warn("Wrong username/password");
    }
  };

  constructor(props)
  {
    super(props);

    this.state =
    {
      // data: [{key: {user: "HMT", pass: "123", lat: 8, lon: 100}}],

      data: [
      {
        key: "",
        user: "",
        pass: ""
      }],

      user: "txt",
      pass: "txt"
    };
  }

  componentDidMount()
  {
    databaseRef.child('user').on('value', (snapshot) =>
    {
      var items = [];

      snapshot.forEach((child) =>
      {
        var childKey = child.key;
        var username = child.child('username').val().toString();
        var password = child.child('password').val().toString();
        // var latitude = child.child('latitude').val().toString();
        // var longitude = child.child('longitude').val().toString();

        // items.push({key: {user: username, pass: password, lat: latitude, lon: longitude}});

        items.push(
        {
          key: childKey, 
          user: username,
          pass: password
        });
      })

      this.setState({data: items});
      console.warn(this.state.data)
    })
  }

  render()
  {
    return (
      <View>
        <ScrollView style = {styles.scroll}>
          <Image
            style = {{width: 150, height: 150, padding: 100}}
            source = {require('../image/logo.png')}
          />

          <Container>
            <Text bold size = {25} color = {argonTheme.COLORS.SUCCESS}>
              {' '}
              Username
            </Text>

            <Block width = {width * 0.8} style = {{marginBottom: 15}}>
              <Input
                borderless
                placeholder = "Name"

                iconContent =
                {
                  <Icon
                    size = {16}
                    color = {argonTheme.COLORS.ICON}
                    name = "hat-3"
                    family = "ArgonExtra"
                    style = {styles.inputIcons}
                  />
                }

                onChangeText = {(text) => {this.setState({user: text});}}
              />
            </Block>
          </Container>

          <Container>
            <Text bold size = {25} color = {argonTheme.COLORS.SUCCESS}>
              {' '}
              Password
            </Text>

            <Block width = {width * 0.8} style = {{marginBottom: 15}}>
              <Input
                borderless
                placeholder = "Password"

                iconContent =
                {
                  <Icon
                    size = {16}
                    color = {argonTheme.COLORS.ICON}
                    name = "hat-3"
                    family = "ArgonExtra"
                    style = {styles.inputIcons}
                  />
                }

                onChangeText = {(text) => {this.setState({pass: text});}}
              />
            </Block>
          </Container>

          <Block middle>
            <Button 
              onPress = {() => {this.signIn()}}
              color = "primary" style = {styles.createButton}>

              <Text bold size = {14} color = {argonTheme.COLORS.WHITE}>
                SIGN IN
              </Text>
            </Button>
          </Block>

          <Block
            middle
            row
            space = "evenly"
            style = {{marginTop: 20, paddingBottom: 24}}>

            <Button 
              onPress = {() => {this.signUp()}}
              small
              style = {{backgroundColor: argonTheme.COLORS.INFO}}>
              Sign Up
            </Button>

            <Button 
              small
              style = {{backgroundColor: argonTheme.COLORS.DEFAULT}}>
              Skip
            </Button>
          </Block>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  scroll: {
    backgroundColor: 'transparent',
    padding: 30,
    flexDirection: 'column',
  },
  label: {
    color: '#0d8898',
    fontSize: 20,
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  textInput: {
    height: 40,
    fontSize: 20,
    backgroundColor: '#FFF',
    borderRadius: 30,
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonBlackText: {
    fontSize: 20,
    color: '#595856',
  },
  primaryButton: {
    backgroundColor: '#34A853',
    padding: 15,
    width: 150,
    marginLeft: 80,
    borderRadius: 10,
  },
  footer: {
    marginTop: 100,
  },
  containter: {
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
