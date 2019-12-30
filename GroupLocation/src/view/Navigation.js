import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Signin from './SigninView'
import Singup from './SignupView'
import MyProfile from './MyProfileView'
import FriendProfile from './FriendProfileView'
import Chat from './Admin/Chat'
import Listgroup from './Admin/Listgroup2'
import MapContainers from './mapView/MapViewContainer'
import CreateGroup from './Admin/CreateGroup'
import JoinGroup from './Admin/JoinGroup'
//import Listgt
import SigninController from './../controller/SigninController2'

const AppNavigator = createStackNavigator({

    SignIn: {
        screen: SigninController,

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
  
export default createAppContainer(AppNavigator);