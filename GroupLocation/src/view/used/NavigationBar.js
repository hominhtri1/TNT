import React, {Component} from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { Icon, Container, Content, Header, Body, Left, Right} from 'native-base'
import App from './MapActivity/App'

class HomeScreen extends Component {

    constructor(props) {
        super(props)     
    }

    chatPress = () => {
        console.warn('Chat'); this.props.navigation.navigate('Chat')
    }

    setMarker = () => {
        this.app.setMarker()
    }

    gotoFriendProfile = () => {
        this.props.navigation.navigate('FriendProfile')
    }

    componentDidMount() {
        //console.warn(this.app.setMarker)
        
        this.props.navigation.setParams({ name: this.app.setMarker });
        console.warn(this.props.navigation.state.params)
    }

    render() {
        return (
            <Container>
                <App 
                    ref={nav => {
                        this.app = nav;
                      }}
                    gotoFriendProfile={this.gotoFriendProfile}
                    {...this.props}/>
                <Header>
                    <Left style={{flex:1}}>
                        <Icon name="ios-menu"
                            onPress={() => 
                                this.props.navigation.openDrawer()
                                //this.props.navigation.navigate( 'contentComponent', { test: 'titi' })
                        }/>    
                    </Left>
                    <Body style={{flex:1}}>
                        <Text>Header</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    <Icon name="ios-chatboxes"
                            onPress={() => {this.chatPress()}}/>  
                    </Right>
                </Header>
                
                
            </Container>
        )
    }
}


const CustomDrawerComponent = (props) => {
    return (
        <SafeAreaView style = {{flex: 1}}>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>       
    )
}

const CustomDrawerContentComponent = (props) => {

    signOut = () => {
        props.navigation.navigate('SignIn')
    }

    proFile = () => {
        props.navigation.navigate('MyProfile')
    }

    joinGroup = () => {
        props.navigation.navigate('JoinGroup')
    }

    createGroup = () => {
        props.navigation.navigate('CreateGroup')
    }

    removeLocation = () => {
        //console.warn(props.navigation.state.params)
        props.navigation.state.routes[0]['params']['name']()
    }



    return(
        <Container>
            <Header> 
                <Body>
                   
                </Body>
            </Header>
            <Body>
                <Button 
                    title = "Profile"
                    onPress = {() => {this.proFile()}} />
                <Button 
                    title = "Create Group"
                    onPress = {() => {this.createGroup()}} />
                <Button 
                    title = "Join Group"
                    onPress = {() => {this.joinGroup()}} />
                    <Button 
                    title = "Remove Location"
                    onPress = {() => {this.removeLocation()}} />
                <Button 
                    title = "Log Out"
                    onPress = {() => {this.signOut()}} />
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

const AppContainers = createAppContainer(AppDrawerNavigator);

class NavigationBar extends Component {

    render() {
        return(
            <AppContainers/>
        )
    }

}

const styles = StyleSheet.create({
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75
    }
})

export {NavigationBar, HomeScreen, AppContainers};
