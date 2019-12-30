import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import Signin from './SigninView'
import Signin from './Login/src/pages/Signin3'
// import Singup from './SignupView'
// import MyProfile from './MyProfileView'
// import FriendProfile from './FriendProfileView'
// import Chat from './Admin/Chat'
import Listgroup from './Admin/Listgroup2'
// import MapContainers from './mapView/MapViewContainer'
// import CreateGroup from './Admin/CreateGroup'
// import JoinGroup from './Admin/JoinGroup'
// import Listgt
import GroupView from './Admin/GroupView'

/*
const AppNavigator = createStackNavigator({

    SignIn: {
        screen: Signin,

        navigationOptions: {
            header: null
        }
    },
    Map: {
        screen: MapContainers,
        
        navigationOptions: {
          header: null
        }
      },
    SignUp: {
        screen: Singup,

    },
    MyProfile: {
        screen: MyProfile
    },
    FriendProfile: {
        screen: FriendProfile
    },
    Chat: {
        screen: Chat
    },
    CreateGroup: {
        screen: CreateGroup
    },
    JoinGroup: {
        screen: JoinGroup
    },
    
    Listgroup: {
        screen: Listgroup
    }


});
*/

const AppNavigator = createStackNavigator(
{
    Signin:
    {
      screen: Signin
    },

    Listgroup:
    {
      screen: Listgroup
    },

    GroupView:
    {
      screen: GroupView
    }
});

export default createAppContainer(AppNavigator);