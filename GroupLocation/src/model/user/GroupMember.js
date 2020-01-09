import {databaseRef} from './../../controller/Firebase_Config'
import User from './User'

class GroupMember {

    static getGroupMembers(setFriendList) {

        userID = User.getCurrentUserId()
        groupID = User.getCurrentGroupId()

        if (groupID == "") return;

        databaseRef.child('user').on('value', (snapshot) =>  { 

            data = []
            //userData = {}
            url = ""

            userID = User.getCurrentUserId()
            groupID = User.getCurrentGroupId()

            if (groupID == "") return;
        
            snapshot.forEach((child) => {

                //var id = child.key;
                //var username = child.child('username').val().toString();
                //var password = child.child('password').val().toString();
                //var currentGroup = child.child('group').val().toString();
                var groupList = child.child('grouplist').val().toString();
                var latitude = child.child('latitude').val().toString();
                var longitude = child.child('longitude').val().toString();
                //var name = child.child('name').val().toString();
                var avatarUrl = child.child('url').val().toString();

                if (child.key != userID && groupList.includes(groupID)) {
                    data.push({id: child.key, url: avatarUrl})
                }

            })
            
            setFriendList(data)
        })

    }







    static getGroupMembersLocation(setFriendPosListAndUser) {

        userID = User.getCurrentUserId()
        groupID = User.getCurrentGroupId()

        if (groupID == "") return;

        databaseRef.child('user').on('value', (snapshot) =>  { 

            data = []
            userData = {}
            url = ""

            userID = User.getCurrentUserId()
            groupID = User.getCurrentGroupId()

            if (groupID == "") return;
        
            snapshot.forEach((child) => {

                //var id = child.key;
                //var username = child.child('username').val().toString();
                //var password = child.child('password').val().toString();
                //var currentGroup = child.child('group').val().toString();
                var groupList = child.child('grouplist').val().toString();
                var latitude = child.child('latitude').val().toString();
                var longitude = child.child('longitude').val().toString();
                //var name = child.child('name').val().toString();
                var avatarUrl = child.child('url').val().toString();
                var hightlight = child.child('highlight').val();

                //console.warn("Hightlight " + hightlight);

                if (child.key != userID && groupList.includes(groupID)) {
                    data.push({id: child.key, key: {lat: latitude, lon: longitude}, isHightlight: hightlight, url: avatarUrl})
                }

                if (child.key == userID) {

                    userData = {
                        latitude: latitude,
                        longitude: longitude,
                        url: avatarUrl
                    }

                }
            })

            console.warn("Daaaaata " + data);
            
            setFriendPosListAndUser(data, userData)
        })
    }

    static getMeetingPointLocation(setMeetingPointCoor) {

        groupID = User.getCurrentGroupId()

        if (groupID == "") return;
        
        databaseRef.child('group').child(groupID).on('value', (snapshot) =>  { 

            lat = snapshot.child('meetingpoint').child('latitude').val().toString()
            lon = snapshot.child('meetingpoint').child('longitude').val().toString()
            visible = snapshot.child('meetingpoint').child('visible').val()

            console.warn("visible " + visible);

            setMeetingPointCoor({latitude: lat, longitude: lon, visible: visible})
        })
    }

    static updateMeetingPoint(location) {

        groupID = User.getCurrentGroupId()

        if (groupID == "") return;

        databaseRef.child('group').child(groupID).child("meetingpoint").set({
            latitude: location.latitude,
            longitude: location.longitude,
            visible: location.visible
        })

    }

    static updateVisible() {

        groupID = User.getCurrentGroupId()

        if (groupID == "") return;

        value = databaseRef.child('group').child(groupID).child("meetingpoint").child("visible").val();
        console.warn(value);

        databaseRef.child('group').child(groupID).child("meetingpoint").child("visible").set(!value);
    }

    static getMemberInfo(friendID, setData) {

        databaseRef.child('user').child(friendID).on('value', snapshot => {
            setData({
                name: snapshot.child('name').val().toString(),
                url: snapshot.child('url').val().toString()
            })
        })

    }

    static setHightlight(id) {

        highlight = false
        databaseRef.child('user').child(id).child('highlight').on('value', snapshot => {
            highlight = snapshot.val()
        })

        databaseRef.child('user').child(id).child('highlight').set(!highlight)
    }


}

export default GroupMember