import {databaseRef} from './../../controller/Firebase_Config'
import SigninController from './../../controller/SigninController'

class User {

    // current active user
    static currentUser = null;

    constructor(id, username, password ,currentGroup, groupList, latitude, longitude, name, avatarUrl) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.currentGroup = currentGroup;
        this.groupList = groupList;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.avatarUrl = avatarUrl;
    }

    // get the current active userID
    static getCurrentUserId() {
        if (this.currentUser != null)
            return this.currentUser.id
        return null
    }

    // get the current active groupID
    static getCurrentGroupId() {
        if (this.currentUser != null)
            return this.currentUser.currentGroup
        return null
    }

    // find user with user and pass
    static checkUser(user, pass) {
        
        login = false

        databaseRef.child('user').once('value', (snapshot) =>  { 
        
            snapshot.forEach((child) => {

                var id = child.key;
                var username = child.child('username').val().toString();
                var password = child.child('password').val().toString();
                var currentGroup = child.child('group').val().toString();
                var groupList = child.child('grouplist').val().toString();
                var latitude = child.child('latitude').val().toString();
                var longitude = child.child('longitude').val().toString();
                var name = child.child('name').val().toString();
                var avatarUrl = child.child('url').val().toString();

                if (user == username && pass == password) {
                    this.currentUser = new User(id, username, password, currentGroup, groupList, latitude, longitude, name, avatarUrl);   
                    login = true
                }
            })
            
            // call back to controller
            if (login) 
                SigninController.getInstance().signInComplete()
            else    
                SigninController.getInstance().signInFail()

        })

    }
    
}

export default User;