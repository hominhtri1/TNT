import User from './../user/User'
import {databaseRef} from './../../controller/Firebase_Config'

class Group {

    static getGroupList(setGroupList) {

        userID = User.getCurrentUserId()

        databaseRef.child('user').child(userID).child('grouplist').on('value', snapshot1 => {
      
            databaseRef.child('group').on('value', (snapshot) => {
              
              var items = [];
            
              snapshot.forEach((child1) =>
              {
                //console.warn("GrouoList " + this.state.groupList)
                if (snapshot1.val().toString().includes(child1.key)) {
                  items.push({
                    key: child1.key,
                    name: child1.child('name').val().toString()
                  })
                }
              })
      
              setGroupList(items)
            })
      
          })


    }

    static checkExitGroup(code, joinGroupFail, joinGroupSuccess) {

        userID = User.getCurrentUserId()

        databaseRef.child('group').once('value', snapshot => {
            
            join = false

            snapshot.forEach((child1) =>
            {
                if (child1.key == code) {

                    var updates = {};

                    var newMemberKey = databaseRef.child('group').child(code).child('member').push().key;
                    updates['/group/' + code + '/member/' + newMemberKey] = userID;

                    var value = ""
                    databaseRef.child('user').child(userID).child('grouplist').on('value', snapshot => {
                        value =  snapshot.val().toString()
                    });

                    databaseRef.child('user').child(userID).child('grouplist').set(value + ',' + code)
                    databaseRef.update(updates);

                    join = true
                }
            
            })

            if (join) 
                joinGroupSuccess()
            else 
                joinGroupFail()
        })



    }



}

export default Group;