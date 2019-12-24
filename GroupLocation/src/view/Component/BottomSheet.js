import React from 'react'
import {
  Text, 
  View, 
  Dimensions, 
  ScrollView, 
  Button, 
  TouchableOpacity,
  Image
} from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'
import FriendList from './FriendList'
import {getLocation} from './../../controller/FireBase/App_Firebase_HMT'
import { Icon } from 'native-base'
import { Avatar } from 'react-native-elements';

const {height,width} = Dimensions.get('window')

class BottomSheet extends React.Component {

  // sliding panel for containning friend list
  render() {
    return (
      <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{top: height/1.5, bottom: 180}}
          animatedValue={this._draggedValue}
          showBackdrop={false}>

          <View style={styles.panel}>
            
            <TouchableOpacity 
              onPress={() => {this.props.toggleLocationButton()}}
              style={styles.toggleLocationButton} 
              title="Test">
              
              <Avatar
                rounded
                size={60}
                source = {require('./../../../resource/Image/touch_map_2.png')}
              />
              
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {this.props.setLocationButton()}}
              style={styles.setLocationButton} 
              title="Test">
              
              <Avatar
                rounded
                size={60}
                source = {require('./../../../resource/Image/marker_hide.png')}
              />

            </TouchableOpacity>

            <View style={styles.panelHeader}>
              <Icon name="arrow-up" />
              <Text style={styles.findFriendText}>Find your friend</Text>
              <Icon name="arrow-up" />
            </View>

            <View style={styles.container}>
                {this.props.children}
            </View>

          </View>

      </SlidingUpPanel>
     
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    
  },
  panel: {
    flex: 1,
    //backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 60,
    backgroundColor: '#818c88',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  },
  toggleLocationButton: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    
    position: 'relative',
    left: width - 80,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',  
  },
  setLocationButton: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#0017ff',   
    position: 'relative',
    left: width - 80,
    bottom: 10
  },
  findFriendText: {
    marginLeft: 20, 
    marginRight: 20,
    color: '#FFF',
    fontSize: 20
  }
}


export default BottomSheet