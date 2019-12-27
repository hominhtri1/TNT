import User from './../model/user/User'
import {Alert} from 'react-native'

// use singleton pattern
class SigninController {

    static myInstance = null;

    constructor(view) {
        this.view = view 
    }

    static getInstance(view = null) {

        if (SigninController.myInstance == null && view != null) {
            SigninController.myInstance = new SigninController(view);
        }

        return this.myInstance;
    }

    // call to user
    signIn(userName, passWord) {

        if (userName == "" || passWord == "") {
            Alert.alert("Empty!!")
            return
        }
 
        User.checkUser(userName, passWord);
    }

    // from user call back
    signInFail() {
        Alert.alert("Sign in failed")
    }

    // from user call back
    signInComplete() {
        this.view.gotoMap()
    }





}

export default SigninController;