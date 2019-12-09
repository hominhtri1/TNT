import React from 'react'
import {Text, View, Dimensions, ScrollView} from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'
import FriendList from './FriendList'
import {getLocation} from './../FireBase/App_Firebase_HMT'

const {height} = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
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
  }
}

class BottomSheet extends React.Component {

    constructor(props)
  {
    super(props);

    this.state =
    {
      data: [{key: {lat: 8, lon: 100}}]
    };

    this.getLocation = getLocation.bind(this);
  }

  componentDidMount() {
    //this.refs.map.fitToElements(true);
    this.getLocation();
  }


  render() {
    return (
        
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{top: height/1.5, bottom: 60}}
          animatedValue={this._draggedValue}
          showBackdrop={false}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
            </View>
            <View style={styles.container}>
                <FriendList data={this.state.data}/>
            </View>
          </View>
        </SlidingUpPanel>
   
    )
  }
}

export default BottomSheet