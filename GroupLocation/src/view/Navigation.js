import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FriendProfile from './FriendProfileView'
import Listgroup from './Admin/Listgroup2'
import JoinGroup from './Admin/JoinGroup'
//import Listgt
import SigninController from './../controller/SigninController2'
import SignupController from './../controller/SignupController'
import MapContainerController from './../controller/MapContainerController'
import TotalMapController from './../controller/TotalMapController'
import MessageController from './../controller/MessageController'
import MyProfileController from './../controller/MyProfileController'
import CreateGroupController from './../controller/CreateGroupController'
import JoinGroupController from './../controller/JoinGroupController'
import FriendProfileController from './../controller/FriendProfileController'

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
        screen: MyProfileController
    },
    FriendProfile: {
        screen: FriendProfileController
    },
    Chat: {
        screen: MessageController
    },
    CreateGroup: {
        screen: CreateGroupController
    },
    JoinGroup: {
        screen: JoinGroupController
    },
    
    Listgroup: {
        screen: Listgroup
    }


});
  
export default createAppContainer(AppNavigator);