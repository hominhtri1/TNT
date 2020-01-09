import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SigninController from './../controller/SigninController2'
import SignupController from './../controller/SignupController'
import TotalMapController from './../controller/TotalMapController'
import MessageController from './../controller/MessageController'
import MyProfileController from './../controller/MyProfileController'
import CreateGroupController from './../controller/CreateGroupController'
import JoinGroupController from './../controller/JoinGroupController'
import FriendProfileController from './../controller/FriendProfileController'
import GroupProfileController from './../controller/GroupProfileController'

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
    
    GroupProfile: {
        screen: GroupProfileController
    }


});
  
export default createAppContainer(AppNavigator);