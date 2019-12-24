import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Signin from './Login/src/pages/Signin2'
import Singup from './Login/src/pages/Signup'
import MyProfile from './Login/src/pages/MyProfile'
import FriendProfile from './Login/src/pages/FriendProfile'
import Chat from './Admin/Chat'
import Listgroup from './Admin/Listgroup2'
import MapContainers from './mapView/MapViewContainer'
import CreateGroup from './Admin/CreateGroup'
import JoinGroup from './Admin/JoinGroup'
//import Listgt

const AppNavigator = createStackNavigator({

    Map: {
        screen: MapContainers,
        
        navigationOptions: {
          header: null
        }
      },
    
    SignIn: {
        screen: Signin,

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
        screen: Listgroup
    },
    
    Listgroup: {
        screen: Listgroup
    }


});
  
export default createAppContainer(AppNavigator);