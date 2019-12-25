import React, {Component} from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { Icon, Container, Content, Header, Body, Left, Right} from 'native-base'
import MapViews from './MapView'
import mapContainerController from './../../controller/MapContainerController'
import { TouchableOpacity } from 'react-native-gesture-handler';

import {databaseRef} from './../../controller/Firebase_Config'

class HomeScreen extends Component {


    gotoChat = () => {
        //console.warn('Chat'); 
        this.props.navigation.navigate('Chat')
    }

    gotoFriendProfile = (id) => {
        console.warn("ID" + id)
        this.props.navigation.navigate('FriendProfile',{friendId: id})
    }

    render() {
        //console.warn(this.props.navigation.getParam('personKey', ""))

        return (
            <Container>

                <MapViews 
                    gotoFriendProfile={this.gotoFriendProfile}
                    key={this.props.navigation.getParam('personKey', "")}
                    group={this.props.navigation.getParam('groupKey', "")}
                    {...this.props}/>

                <Header>

                    <Left style={{flex:1}}>
                        <Icon name="menu"
                              onPress={() => this.props.navigation.openDrawer({dataRef: databaseRef, personKey: key})}/>    
                    </Left>

                    <Body style={{flex:1}}>
                        <Text>Map</Text>
                    </Body>

                    <Right style={{flex:1}}>

                        <Icon name="md-chatboxes"
                              onPress={() => {this.gotoChat()}}/>  
                    </Right>
                    
                </Header>

            </Container>
        )
    }
}

const CustomDrawerContentComponent = (props) => {

    //databaseRef = props.navigation.getParam('dataRef', null);
    key = props.navigation.getParam('personKey', "");

    gotoMyProfile = () => {
        props.navigation.navigate('MyProfile')
    }

    gotoCreateGroup = () => {
        props.navigation.navigate('CreateGroup')
    }

    gotoJoinGroup = () => {
        props.navigation.navigate('JoinGroup')
        props.navigation.navigate('JoinGroup', {dataRef: databaseRef, personKey: key});
    }

    gotoLogIn = () => {
        props.navigation.navigate('SignIn')
    }

    return(
        <Container>
            <Header>
                <Body/>
            </Header>
            <Content 
                contentContainerStyle={{ flexDirection: 'column' }}
                bounces={false}>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {this.gotoMyProfile()}}>

                    <Text style={styles.text}>Profile</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {this.gotoCreateGroup()}}>

                    <Text style={styles.text}>Create group</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {this.gotoJoinGroup()}}>

                    <Text style={styles.text}>Join group</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {this.gotoLogIn()}}>

                    <Text style={styles.text}>Log out</Text>

                </TouchableOpacity>
                
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        //backgroundColor: "#ede3e3",
        borderWidth: 0.25,
        paddingLeft: 20
    },
    text: {
        fontSize: 20
    }



})


const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: HomeScreen
    },
    {
        contentComponent: props => <CustomDrawerContentComponent {...props} />,
    },
    
)

const MapContainers = createAppContainer(AppDrawerNavigator);
export default MapContainers;
