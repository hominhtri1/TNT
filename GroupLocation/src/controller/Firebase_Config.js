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

var storageRef = firebaseApp.storage().ref();

export {databaseRef, storageRef};