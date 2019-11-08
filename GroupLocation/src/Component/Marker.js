import React, {Component} from 'react'
import {Image} from 'react-native'
import {Marker} from 'react-native-maps'
import { Avatar } from 'react-native-elements';

export default class NewMarker extends Component {

    render() {
        return(
        <Marker
        key = {this.key}
        coordinate={this.props.coordinate}
        title="SOme thung title"
        >
          <Avatar
            rounded
            source={require("./../../resource/Image/test.jpg")}
          />
          </Marker>
        )
    }

}