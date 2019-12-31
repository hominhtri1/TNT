import React, {Component} from 'react'
import {FlatList, StyleSheet, View, Text, Image, Button} from 'react-native'
import {Avatar} from 'react-native-elements'
import memberListController from './../../controller/MemberListController'
import { TouchableOpacity } from 'react-native-gesture-handler'

class FriendList extends Component {

    constructor(props) {
        super(props)
    }

    renderItem = ({item}) => {
        console.warn(item.id)
        return(   
            <View style={styles.itemContainer}>   

                <Avatar
                    containerStyle={styles.item}
                    size="large"
                    
                    source={{uri: item.url}}/>

                <View style={{
                    flex: 1,
                    flexDirection: 'row-reverse',
                    alignSelf: 'center'
                }}>

                <TouchableOpacity 
                    title="View Profile"
                    style={styles.button}
                    onPress={() => {this.props.setHightlight(item.id)}}>
                    
                    <Text
                        style={styles.text}>
                        Hightlight
                    </Text>
                    
                </TouchableOpacity>
                
                <TouchableOpacity 
                    title="View Profile"
                    style={styles.button}
                    onPress={() => {this.props.gotoFriendProfile(item.id)}}>
                    
                    <Text
                        style={styles.text}>
                        View Profile
                    </Text>

                </TouchableOpacity>

                </View>

            </View>
        )
    }

    render() {

        return(
            <FlatList 
                containerStyle={styles.containner}
                renderItem={this.renderItem}
                data={this.props.friendList} />        
        )
    }
}

const styles = StyleSheet.create({
    containner: {
        flexDirection: "column"
        
    },
    item: {
       // marginBottom: 10
    },
    itemContainer: {
        padding: 10,
        
        backgroundColor: "#dae3e0",
        borderWidth: 0.3,
        
        flexDirection: 'row',
        
    },
    button: {
        padding: 5,
        backgroundColor: "#818c88",
        marginLeft: 10
        
    },
    text: {
        fontSize: 20,
        color: "#fff"
    }
})

export default FriendList;