import React, {Component} from 'react'
import {FlatList, StyleSheet, View, Text, Image} from 'react-native'
import {Avatar} from 'react-native-elements'

class FriendList extends Component {

    renderItem = ({item}) => {
        return(
            
            <View style={styles.itemContainer}>
                
                <Avatar
                    containerStyle={styles.item}
                    size="large"
                    rounded
                    source={require("./../../resource/Image/test.jpg")}
                    />
 

            </View>

           
        )

    }



    render() {
        return(
            
                <FlatList 
                    containerStyle={styles.containner}
                    renderItem={this.renderItem}
                    data={this.props.data + this.props.data + this.props.data}>
                </FlatList>
            
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
        color: "#f00"
    }
})

export default FriendList;