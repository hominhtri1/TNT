import React from 'react'
import {Text, View, Dimensions, ScrollView, Button, TouchableOpacity} from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'
import FriendList from './FriendList'
import {getLocation} from './../../controller/FireBase/App_Firebase_HMT'
import {Icon} from 'native-base'

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
              style={styles.toggleLocationButton} title="Test"/>
            <TouchableOpacity 
              onPress={() => {this.props.setLocationButton()}}
              style={styles.setLocationButton} title="Test"/>
            <View style={styles.panelHeader}>
              <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
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
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: '#ee6e73',   
    position: 'relative',
    left: width - 80,
    bottom: 20               
  },
  setLocationButton: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#0017ff',   
    position: 'relative',
    left: width - 80,
    bottom: 10
  }
}


export default BottomSheet