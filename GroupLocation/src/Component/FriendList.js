import React, {Component} from 'react'
import {FlatList, StyleSheet, View, Text} from 'react-native'
import {Avatar} from 'react-native-elements'

class FriendList extends Component {

    renderItem = ({item}) => {
        return(
          <Avatar
            containerStyle={styles.item}
            size="large"
            rounded
            source={require("./../../resource/Image/test.jpg")}
          />
        )

    }

    render() {
        return(
            <FlatList 
                style={styles.containner}
                renderItem={this.renderItem}
                data={this.props.data}>
            </FlatList>
        )
    }

}

const styles = StyleSheet.create({
    containner: {
        position: "absolute",
        bottom: 10,
        left: 10,
        color: "#ff0c0c"
    },
    item: {
        marginBottom: 10
    }
})

export default FriendList;