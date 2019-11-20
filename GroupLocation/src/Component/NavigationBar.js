import React, {Component} from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { Icon, Container, Content, Header, Body, Left} from 'native-base'
//import Icon  from 'react-native-vector-icons/FontAwesome';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import App from './../MapActivity/App'

class HomeScreen extends Component {

    static navigationOptions = {
        drawerLabel: 'Notifications',
        drawerIcon: ({ tintColor }) => (
          <Image
            //source={require('./notif-icon.png')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        ),
    };

    render() {
    return (
        <Container>
            <Header>
                <Left>
                    <Icon name="ios-menu"
                        onPress={() => this.props.navigation.openDrawer()}/>    
                </Left>
            </Header>
            <App/>
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
    return(
        <Container>
            <Header> 
                <Body>
                    <Image 
                        style={styles.drawerImage}
                        source={require('./../../resource/Image/test.jpg')}
                    />
                </Body>
            </Header>

        </Container>
    )
}

const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: HomeScreen
    },
    {
        contentComponent: CustomDrawerComponent,
        
    },
    
)

const AppContainer = createAppContainer(AppDrawerNavigator);

class NavigationBar extends Component {

    render() {
        return(
            <AppContainer/>
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

export default NavigationBar;

