import React, {Component} from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { Icon, Container, Content, Header, Body, Left, Right} from 'native-base'
import MapViews from './MapView'
import mapContainerController from './../../controller/MapContainerController'

class HomeScreen extends Component {
    
    gotoChat = () => {
        //console.warn('Chat'); 
        this.props.navigation.navigate('Chat')
    }

    gotoFriendProfile = () => {
        this.props.navigation.navigate('FriendProfile')
    }

    render() {
        return (
            <Container>
                <MapViews 
                    gotoFriendProfile={() => this.gotoFriendProfile()}
                    {...this.props}/>
                <Header>
                    <Left style={{flex:1}}>
                        <Icon name="ios-menu"
                              onPress={() => this.props.navigation.openDrawer({dataRef: databaseRef, personKey: key})}/>    
                    </Left>
                    <Body style={{flex:1}}>
                        <Text>Map</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    <Icon name="ios-chatboxes"
                          onPress={() => {this.gotoChat()}}/>  
                    </Right>
                </Header>
            </Container>
        )
    }
}

const CustomDrawerContentComponent = (props) => {

    databaseRef = props.navigation.getParam('dataRef', null);
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
            <Body>
                <Button 
                    title = "Profile"
                    onPress = {() => {this.gotoMyProfile()}} />
                <Button 
                    title = "Create Group"
                    onPress = {() => {this.gotoCreateGroup()}} />
                <Button 
                    title = "Join Group"
                    onPress = {() => {this.gotoJoinGroup()}} />
                <Button 
                    title = "Log Out"
                    onPress = {() => {this.gotoLogIn()}} />
            </Body>
        </Container>
    )
}

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
