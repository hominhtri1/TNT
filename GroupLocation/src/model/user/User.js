import {databaseRef} from './../../controller/Firebase_Config'
import { create } from 'react-test-renderer';

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

    // get current url
    static getCurrentUrl() {
        if (this.currentUser != null)
            return this.currentUser.avatarUrl
        return null
    }



    // find user with user and pass
    // for signin
    static checkUser(user, pass, onSigninFail, onSigninSuccess) {
        
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
                onSigninSuccess()
            else    
                onSigninFail()
        })

    }

    // add new user to firebase
    // for signup   
    static addUser(user, pass, onSignupFail, onSignupSuccess) {
        
        created = true 

        databaseRef.child('user').once('value', (snapshot) =>  { 

            snapshot.forEach((child) => {
                if (child.child("username").val().toString() == user) created = false;
            })

            if (created) {

                databaseRef.child('user').push().set(
                {
                    group: "",
                    latitude: "",
                    longitude: "",
                    password: pass,
                    username: user,
                    name: "",
                    url: "",
                    grouplist: []
                });
                
                onSignupSuccess();
            }
            else {
                onSignupFail();
            }
        })
    }

    static updatePosition(lat,lon) {

        /*id = this.getCurrentUserId();

        databaseRef.child('user').child(id).child('latitude').set(lat)
        databaseRef.child('user').child(id).child('longitude').set(lon);*/
    }

    static leaveGroup(gotoMap) {
        
        if (this.currentUser.currentGroup == "") {
            console.warn("Not in any group");
            return;
        }
        
        databaseRef.child('group').child(this.currentUser.currentGroup).child('member').once('value', snapshot => {
            
            updates = {};

            updates['/user/' + this.currentUser.id + '/group'] = "";

            snapshot.forEach(member =>
            {
                if (member.val().toString() == this.currentUser.id) {
                    console.warn(member.val().toString());
                    updates['/group/' + this.currentUser.currentGroup + '/member/' + this.currentUser.id] = null;
                }
            })

            databaseRef.update(updates);
            
            

            grouplist = ""
            databaseRef.child('user').child(this.currentUser.id).child('grouplist').on('value', snapshot => {
                grouplist = snapshot.val().toString()
            })

            grouplist = grouplist.replace(',' + this.currentUser.currentGroup,'')

            console.warn("GL: " + grouplist)
            
            databaseRef.child('user').child(this.currentUser.id).child('grouplist').set(grouplist)
        
            this.currentUser.currentGroup = ""

            console.warn('Left group');

            gotoMap();
        })
    }

    static setProfile(setProfile) {
        setProfile(this.currentUser.name)
    }

    static createNewGroup(code, gotoNewGroup) {

        personKey = this.currentUser.id;

        // add group
        
        var key = databaseRef.child('group').push().key
        databaseRef.child('group').child(key).set(
        {
            name: code,
            meetingpoint: {
                latitude: 8,
                longitude: 100
            },
            leader: personKey
        });

        group = ""
        databaseRef.child('user').child(personKey).child('grouplist').once('value', snapshot => {
            group = snapshot.val().toString();
        })

        databaseRef.child('user').child(personKey).child('grouplist').set(group + ',' + key)

        gotoNewGroup(code, key);
    }

    static getNewGroup(gotoNew, key) {

        this.currentUser.currentGroup = key;
        gotoNew()
    }

    static setNewGroup(groupID, gotoNewGroup) {
        
        this.currentUser.currentGroup = groupID;
        databaseRef.child('user').child(this.currentUser.id).child('group').set(groupID);

        gotoNewGroup();
        
    }

    static setGroupCode(code) {
        this.currentUser.currentGroup = code;
    }

}

export default User;