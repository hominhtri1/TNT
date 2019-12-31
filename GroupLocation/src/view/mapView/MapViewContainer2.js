import React, {Component} from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { Icon, Container, Content, Header, Body, Left, Right} from 'native-base'
import MapViews from './MapView'
import mapContainerController from '../../controller/MapContainerController'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapController from './../../controller/MapController2'

const HomeScreen = (props) => {

        return (
            <Container>

                {/*<MapViews />*/}
                <MapController />
                
                <Header>

                    <Left style={{flex:1}}>
                        <Icon name="menu"
                              onPress={() => props.navigation.openDrawer()}/>    
                    </Left>

                    <Body style={{flex:1}}>
                        <Text>Map</Text>
                    </Body>

                    <Right style={{flex:1}}>

                        <Icon name="md-chatboxes"
                              onPress={() => {props.screenProps.gotoChat()}}/>  
                    </Right>
                    
                </Header>

            </Container>
        )
}

const CustomDrawerContentComponent = (props) => {

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
                    onPress = {() => {props.screenProps.gotoMyProfile()}}>

                    <Text style={styles.text}>Profile</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {group.screenProps.gotoGroupProfile()}}>

                    <Text style={styles.text}>Group profile</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {group.screenProps.gotoCreateGroup()}}>

                    <Text style={styles.text}>Create group</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {group.screenProps.gotoJoinGroup()}}>

                    <Text style={styles.text}>Join group</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {group.screenProps.leaveGroup()}}>

                    <Text style={styles.text}>Leave group</Text>

                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress = {() => {group.screenProps.gotoLogIn()}}>

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
        Home: props => <HomeScreen {...props} />
    },
    {
        contentComponent: props => <CustomDrawerContentComponent {...props} />,
    },
    
)

const MapContainers = createAppContainer(AppDrawerNavigator);
export default MapContainers;
