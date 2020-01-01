import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Signin from './SigninView'
import Singup from './SignupView'
import MyProfile from './MyProfileView'
import FriendProfile from './FriendProfileView'
import Chat from './Admin/Chat'
import Listgroup from './Admin/Listgroup2'
import MapContainers from './mapView/MapViewContainer2'
import CreateGroup from './Admin/CreateGroup'
import JoinGroup from './Admin/JoinGroup'
//import Listgt
import SigninController from './../controller/SigninController2'
import SignupController from './../controller/SignupController'
import MapContainerController from './../controller/MapContainerController'
import TotalMapController from './../controller/TotalMapController'
import MessageController from './../controller/MessageController'

const AppNavigator = createStackNavigator({

    SignIn: {
        screen: SigninController,

        navigationOptions: {
            header: null
        }
    },
    Map: {
        screen: TotalMapController,
        
        navigationOptions: {
          header: null
        }
      },
    SignUp: {
        screen: SignupController,

    },
    MyProfile: {
        screen: MyProfile
    },
    FriendProfile: {
        screen: FriendProfile
    },
    Chat: {
        screen: MessageController
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