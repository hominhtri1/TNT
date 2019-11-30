/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/MapActivity/App'
import {name as appName} from './app.json';
//import App from './src/FireBase/App_Firebase_HMT'
//import HelloWorldApp from './src/GPSLocation'
//import NavigationBar from './src/Component/NavigationBar'
import NavigationBar from './src/Component/NavigationBar'
import Signin from './src/Login/src/pages/Signin'
import Signup from './src/Login/src/pages/Signup'


AppRegistry.registerComponent(appName, () => Signup);
