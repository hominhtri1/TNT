import React, {Component} from 'react'
import {FlatList, StyleSheet, View, Text, Image, Button} from 'react-native'
import {Avatar} from 'react-native-elements'
import memberListController from './../../controller/MemberListController'

class FriendList extends Component {

    constructor(props) {
        super(props)
    }


    renderItem = ({item}) => {
        return(   
            <View style={styles.itemContainer}>    
                <Avatar
                    containerStyle={styles.item}
                    size="large"
                    rounded
                    source={require("./../../../resource/Image/test.jpg")}/>
                <Button 
                    title="View Profile"
                    onPress={() => {this.props.gotoFriendProfile()}}/>
                <Button 
                    title="Hightlight"
                    onPress={() => {this.props.setHightlight(item.id)}}/>
            </View>
        )
    }

    render() {
        return(
            <FlatList 
                containerStyle={styles.containner}
                renderItem={this.renderItem}
                data={this.props.data } />        
        )
    }
}

const styles = StyleSheet.create({
    containner: {
        flexDirection: "column"
        
    },
    item: {
        marginBottom: 10
    },
    itemContainer: {
        padding: 10,
        flex: 1,
        color: "#f00",
        borderWidth: 1,
        flexDirection: "row",
    }
})

export default FriendList;