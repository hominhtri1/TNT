import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import NavigationBar from './../Component/NavigationBar'
import Signin from './../Login/src/pages/Signin'
import Singup from './../Login/src/pages/Signup'
import MyProfile from './../Login/src/pages/MyProfile'
import FriendProfile from './../Login/src/pages/FriendProfile'
import Chat from './../Admin/Chat'
import Listgroup from './../Admin/Listgroup'
import {HomeScreen, NavigationBar, AppContainers} from './../Component/NavigationBar'

const AppNavigator = createStackNavigator({
    
    SignIn: {
        screen: Signin
    },
    SignUp: {
        screen: Singup
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
        screen: Listgroup
    },
    JoinGroup: {
        screen: Listgroup
    },
    Map: {
      screen: AppContainers,

      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    }


});
  
export default createAppContainer(AppNavigator);