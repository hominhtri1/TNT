import React, {Component} from 'react'
import {ImageBackground, StyleSheet, View, Image} from 'react-native'
import {Marker} from 'react-native-maps'
import { Avatar } from 'react-native-elements';
import { Icon } from 'native-base'

export default class NewMarker extends Component {

    checkHightlight = () => {
      return [
        styles.transparentBorder,
        this.props.isHightlight ? null : styles.transparentRedBorder,
      ];
    }

    image = <Image source={require("./../../../resource/Image/test.jpg")} />

    render() {
      return(
          <Marker
            key = {this.key}
            coordinate={this.props.coordinate}
            title="SOme thung title"
            flat={false}>
              <View style={styles.viewContainer}>
                <View style={this.checkHightlight()}>
                  
                    <ImageBackground
                      style={styles.avatarContainer}
                      source={require('./../../../resource/Image/marker.png')}>
                      <Avatar
                          size={40}
                          containerStyle={styles.avatar}
                          rounded
                          source={require("./../../../resource/Image/test.jpg")}
                        />
                        
                    </ImageBackground>
                  </View>
                  <View style={styles.triangle}/>

                  
  
            </View>
          </Marker>
        )
    }

}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    transform: [{ rotate: '90deg'}]
  },
  whiteBorder: {
    padding: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparentBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 19,
    width: 75,
    height: 75,
    borderRadius: 45,
    borderWidth: 2,
  },
  transparentRedBorder: {
    borderColor: '#ff0c0c',
    backgroundColor: '#ff0c0c80',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',

  },
  avatar: {
    marginBottom: 8
  }
})