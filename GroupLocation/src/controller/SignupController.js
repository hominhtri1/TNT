import React, {Component} from 'react'

import User from '../model/user/User'
import {Alert} from 'react-native'

import Signup from '../view/SignupView2'

// use singleton pattern
class SignupController extends Component {

    onAddUser = (user, pass) => {

        if (user == "" || pass == "") {
            Alert.alert("Empty!!")
            return
        }
 
        User.addUser(user, pass, this.onSignupFail, this.onSignupSuccess);

    }

    onSignupFail = () => {
        Alert.alert("Sign up failed");
    }

    onSignupSuccess = () => {
        Alert.alert("Sign up successfully");
        this.props.navigation.navigate('SignIn');
    }

    render() {
        return (
            <Signup 
                onAddUser={this.onAddUser}/>
        )
    }

}

export default SignupController;
