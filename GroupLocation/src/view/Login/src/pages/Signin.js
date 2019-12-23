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
} from 'react-native';
import {Button, Icon, Input} from '../../components';
import {Images, argonTheme} from '../../constants';
import {green} from 'ansi-colors';
const {width, height} = Dimensions.get('screen');

//import Icon from 'react-native-vector-icons/FontAwesome';

export default class Signin extends Component {

  signUp = () => {
    //console.warn("Sign UP")
    this.props.navigation.navigate('SignUp')
  
  }

  signIn = () => {
    //console.warn("Sign UP")
    this.props.navigation.navigate('Map')
  
  }
  
  render() {
    return (
      <View>
        <ScrollView style={styles.scroll}>
          <Image
            style={{width: 150, height: 150, padding: 100}}
            source={require('../image/logo.png')}
          />

          <Container>
            <Text bold size={25} color={argonTheme.COLORS.SUCCESS}>
              {' '}
              Username
            </Text>
            <Block width={width * 0.8} style={{marginBottom: 15}}>
              <Input
                borderless
                placeholder="Name"
                iconContent={
                  <Icon
                    size={16}
                    color={argonTheme.COLORS.ICON}
                    name="hat-3"
                    family="ArgonExtra"
                    style={styles.inputIcons}
                  />
                }
              />
            </Block>
          </Container>
          <Container>
            <Text bold size={25} color={argonTheme.COLORS.SUCCESS}>
              {' '}
              Password
            </Text>
            <Block width={width * 0.8} style={{marginBottom: 15}}>
              <Input
                borderless
                placeholder="Password"
                iconContent={
                  <Icon
                    size={16}
                    color={argonTheme.COLORS.ICON}
                    name="hat-3"
                    family="ArgonExtra"
                    style={styles.inputIcons}
                  />
                }
              />
            </Block>
          </Container>
          <Block middle>
            <Button 
              onPress={() => {this.signIn()}}
              color="primary" style={styles.createButton}>
              <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                SIGN IN
              </Text>
            </Button>
          </Block>
          <Block
            middle
            row
            space="evenly"
            style={{marginTop: 20, paddingBottom: 24}}>
            <Button 
              onPress={() => {this.signUp()}}
              small style={{backgroundColor: argonTheme.COLORS.INFO}}>
              Sign Up
            </Button>
            <Button 
              small style={{backgroundColor: argonTheme.COLORS.DEFAULT}}>
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
