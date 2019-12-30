import React, {Component} from 'react';
import Container from './Login/components/Container';
//import Label from '../../components/Label';
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
import {Button, Icon, Input} from './Login/components';
import {Images, argonTheme} from './Login/constants';
import {green} from 'ansi-colors';

import {databaseRef} from '../controller/Firebase_Config'

import SigninController from '../controller/SigninController'

const {width, height} = Dimensions.get('screen');

export default class Signin extends Component {

  constructor(props) {
    super(props);

    this.state = {user: "", pass: ""}
  }

  render()
  {
    return (
      <View>
        <ScrollView style = {styles.scroll}>
          <Image
            style = {{width: 150, height: 150, padding: 100}}
            source = {require('./../../resource/Image/logo.png')}
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
                password
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
              onPress = {() => {
                this.props.onCheckUser(this.state.user, this.state.pass)
              }}
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
              onPress = {() => {this.props.gotoSignup()}}
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
