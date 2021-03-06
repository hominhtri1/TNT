import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  Platform
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "./Login/components";
import { Images, argonTheme } from "./Login/constants";

const { width, height } = Dimensions.get("screen");

class Signup extends React.Component {

  signUp()
  {
    if (this.state.user == "") {
      Alert.alert("Username is empty !!");
      return;
    }

    if (this.state.pass == "") {
      Alert.alert("Password is empty !!");
      return;
    }

    var found = false;

    this.state.data.forEach(person =>
    {
      if (person.user == this.state.user)
        found = true;
    })

    if (found)
    {
      //console.warn("Duplicate username");
      Alert.alert("Account existed. Please enter new username !!");
      return;
    }

    databaseRef.child('user').push().set(
    {
      group: "",
      latitude: "",
      longitude: "",
      grouplist: "",
      password: this.state.pass,
      username: this.state.user
    });

    console.warn('Signed up');
    Alert.alert("Signed up completely!!");
  };

  constructor(props)
  {
    super(props);

    databaseRef = this.props.navigation.getParam('dataRef', null);
    //var key = this.props.navigation.getParam('personKey', "");

    this.state =
    {
      // data: [{key: {user: "HMT", pass: "123", lat: 8, lon: 100}}],

      data: [
      {
        key: "",
        user: "",
        pass: ""
      }],

      user: "",
      pass: ""
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
    })
  }



  render() {
    return (

      <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{ flex: 1 }}
                    //keyboardVerticalOffset={64}
                    behavior="padding"
                    enabled
                  >
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
              <Text bold size={25} color={argonTheme.COLORS.ERROR}>
                          {" "}
                          Sign Up With
                        </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                </Block>
                <Block flex center>
                  
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Text bold size={20} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          Username
                        </Text>
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

                        onChangeText = {(text) => {this.setState({user: text});}}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Text bold size={20} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          Phone Number
                        </Text>
                      <Input
                        borderless
                        placeholder="Phone"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                    <Text bold size={20} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          Password
                        </Text>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }

                        onChangeText = {(text) => {this.setState({pass: text})}}
                      />
                    </Block>
                  
                    <Block middle>
                      <Button 
                        color="primary" 
                        style={styles.createButton}
                        onPress={() => this.signUp()}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                  
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Signup;
