/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/view/MapActivity/App'
import {name as appName} from './app.json';
//import App from './src/FireBase/App_Firebase_HMT'
//import HelloWorldApp from './src/GPSLocation'
//import NavigationBar from './src/Component/NavigationBar'
import NavigationBar from './src/view/Component/NavigationBar'
import Signin from './src/view/Login/src/pages/Signin'
import Signup from './src/view/Login/src/pages/Signup'
import Directions from './src/view/Test/test'
import MyProfile from './src/view/Login/src/pages/MyProfile'
import FriendProfile from './src/view/Login/src/pages/FriendProfile'
import Chat from './src/view/Admin/Chat'
import Group from './src/view/Admin/Group'
import Listgroup from './src/view/Admin/Listgroup'
//import Me from './src/Admin/Listgroup'
import Admin from './src/view/Admin/Admin'


AppRegistry.registerComponent(appName, () => NavigationBar);
