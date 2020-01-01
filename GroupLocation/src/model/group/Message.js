import User from './../user/User'
import {databaseRef} from './../../controller/Firebase_Config'

class Message {

    static getMessage(setMessages) {

        userKey = User.getCurrentUserId()
        group = User.getCurrentGroupId()

        databaseRef.child('group').child(group).child('message').on('value', (snapshot) =>
        {
          var items = [];
    
          snapshot.forEach(child =>
          {
            //var childKey = child.key;
            //var _id = child.child('_id').val().toString();
            var _userId = child.child('user').child('_id').val().toString()
            var avatar = child.child('user').child('avatar').val().toString()

            var user = {
                _id: _userId,
                name: "React Native",
                avatar: avatar
            }

            var text = child.child('text').val().toString();
            var date = new Date(child.child('createdAt').val().toString())
            
            if (_userId == userKey) {
                user = {}
            }
    
            items.push(
            {
              text: text,
              createdAt: date,
              user: user
            });
          });
    
          setMessages(items.reverse())
        })

    }

    static pushMessage(message) {

        user = User.getCurrentUserId()
        group = User.getCurrentGroupId()
        url = User.getCurrentUrl()

        console.warn("URL " + url)

        databaseRef.child('group').child(group).child('message').push().set(
            {
              //_id: message._id,
              text: message.text,
              createdAt: message.createdAt.toString(),
              user: {
                _id: user,
                name: "React Native",
                avatar: url
              }
            }
        )

    }





}

export default Message;