import React, {Component} from 'react'

import User from '../model/user/User'
import {Alert} from 'react-native'

import SigninView from '../view/SigninView2'

// use singleton pattern
class SigninController extends Component {

    constructor(props) {
        super(props)
        this.state = {data: ['somenumber']}
        this.testdata = ['somesnumber']
    }

    onCheckUser = (user, pass) => {

        if (user == "" || pass == "") {
            Alert.alert("Empty!!")
            return
        }
 
        User.checkUser(user, pass, this.onSigninFail, this.onSigninSuccess);

    }

    onSigninFail = () => {
        Alert.alert("Sign in faile");
    }

    onSigninSuccess = () => {
        this.props.navigation.navigate('Map');
    }

    gotoSignup = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <SigninView 
                gotoSignup={this.gotoSignup}
                onCheckUser={this.onCheckUser}/>
        )
    }

}

export default SigninController;
