import React, {Component} from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { Icon, Container, Content, Header, Body, Left, Right} from 'native-base'
import App from './../MapActivity/App'

class HomeScreen extends Component {

    static navigationOptions = {
        drawerLabel: 'Notifications',
        drawerIcon: ({ tintColor }) => (
          <Image
            //source={require('./../../resource/Image/test.jpg')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        ),
    };

    render() {
        return (
            <Container>
                <App/>
                <Header>
                    <Left style={{flex:1}}>
                        <Icon name="ios-menu"
                            onPress={() => this.props.navigation.openDrawer()}/>    
                    </Left>
                    <Body style={{flex:1}}>
                        <Text>Header</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    <Icon name="ios-chatboxes"
                            onPress={() => this.props.navigation.openDrawer()}/>  
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
    return(
        <Container>
            <Header> 
                <Body>
                    <Image 
                        style={styles.drawerImage}
                        source={require('./../../../resource/Image/test.jpg')}
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
        contentComponent: CustomDrawerContentComponent,
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

