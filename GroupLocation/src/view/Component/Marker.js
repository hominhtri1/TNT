import React, {Component} from 'react'
import {ImageBackground, StyleSheet, View, Image,Text} from 'react-native'
import {Marker} from 'react-native-maps'
import { Avatar } from 'react-native-elements';
import { Icon } from 'native-base'

const testCoor = {latitude: 10.76291,
  longitude: 106.67997}

export default class NewMarker extends Component {

    constructor(pros) {
      super(pros);

      this.state = {rotate: this.findAngel(this.props.HLCoordinate)} 
    }

    // calculate between desination and current location
    findAngel = (coordinate) => {
      
      return Math.PI/2 - Math.atan2(
        this.props.coordinate.latitude - coordinate.latitude,
        this.props.coordinate.longitude - coordinate.longitude
      ).toString()
      
    }




    checkHightlight = () => {
      
      return (
        this.props.isHightlight ? [styles.transparentRedBorder,styles.transparentBorder] : null
      )
    }

    componentWillReceiveProps(nextProps){
      /*console.warn(this.nextProps)
      if(this.props != nextProps){
        this.setState({rotateAngel: '2'})
      }*/
    }

    componentDidUpdate(prevProps, prevState) {
      //console.warn(prevProps)
      if(this.props != prevProps){
        
        
        this.setState({rotate: this.findAngel(this.props.HLCoordinate)}) 
        //console.warn(this.state.rotate)

      
      }
    }

    rotateRender = () => {

      return(
          <View 
            key={this.state.rotate}  
            style={[
              this.checkHightlight(),
              styles.viewContainer,
              {
                transform: [{rotate: this.state.rotate}]
              }
            ]}>
                  
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
              
              <View style={styles.triangle}/>
        </View>
      )

    }

    image = <Image source={require("./../../../resource/Image/test.jpg")} />

    render() {
      
      return(
          <Marker
             ref={c => (this.style = c)}
            key = {this.key}
            coordinate={this.props.coordinate}
            title="SOme thung title"
            flat={false}>
            {this.rotateRender()}
          </Marker>
        )
    }

}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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