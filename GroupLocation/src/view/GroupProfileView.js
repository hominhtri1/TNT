import React, {Component} from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "./Login/constants";
import { Button, Select, Icon, Input, Header, Switch } from "./Login/components";

const { width } = Dimensions.get("screen");


class GroupProfile extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { groupNameField: "" }
  }

  /*render()
  {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View>
          <Text>
            Group Name: {this.props.groupName}
          </Text>

          <TextInput
            placeholder = "Enter new group name here"
            onChangeText = {(text) => {this.setState({groupNameField: text})}}
          />

          <Button
            title = "Change group name"
            onPress = {() => {this.props.changeGroupName(this.state.groupNameField)}}
          />
        </View>
        
        <View>
          <Text>
            Group Code: {this.props.groupCode}
          </Text>

          <Button
            title = "Generate new group code"
            onPress = {() => {this.props.generateGroupCode()}}
          />
        </View>

        <View>
          <Text>
            Member list:
          </Text>
          
          <FlatList
            data = {this.props.data}

            renderItem = {({item}) => (
              <Text>{item.username}</Text>
            )}
          />
        </View>
        </ScrollView>
      </Block>
    )
  }*/

  renderInputs = () => {
    return (
      <Block flex style={styles.group}>
          <Text bold size={30} style={styles.title}>
              YOUR GROUP : {this.props.groupName}
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Enter new group name here"
                style={{
                  borderColor: argonTheme.COLORS.INFO,
                  borderRadius: 4,
                  backgroundColor: "#fff"
                }}
                iconContent={<Block />}
                onChangeText = {(text) => {this.setState({code: text})}}
              />
          </Block>
      </Block>
    );
  };

  renderButtons = () => {
    return (
      <Block flex>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          
          <Block center>
            <Button
              color = "secondary"
              textStyle = {{ color: "black", fontSize: 12, fontWeight: "700" }}
              style = {styles.button}
              onPress = {() => {this.props.changeGroupName(this.state.code)}}>
                CHANGE YOUR GROUP NAME
            </Button>
          </Block>
  
          
        </Block>
        
      </Block>
    );
  };

  renderButton2 = () => {
    return(
      <Block flex style={styles.group}>
          <Text bold size={30} style={styles.title}>
              YOUR GROUP CODE : {this.props.groupCode}
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Block center>
              <Button
                color = "secondary"
                textStyle = {{ color: "black", fontSize: 12, fontWeight: "700" }}
                style = {styles.button}
                onPress = {() => {this.props.generateGroupCode()}}>
                  GENERATE NEW GROUP CODE
              </Button>
              <Text bold size={20} style={styles.title}>
                Member List
              </Text>
              {this.renderGroup()}
            </Block>
          </Block>
      </Block>
    )

  }

  renderGroup = () => {
    
    return this.props.data.map(group => {
      return (
        <Block center>
          <Button style={styles.button}>
            {group.username}
          </Button>
        </Block>
      )
    })
  }

  render() {

    return(
      <Block flex center>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
            {this.renderInputs()}
            {this.renderButtons()}
            {this.renderButton2()}
            {/*this.renderGroup()*/}

          </ScrollView>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE 
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },
  inputDefault: {
    borderBottomColor: argonTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: argonTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: argonTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: argonTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: argonTheme.COLORS.ERROR
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
});



export default GroupProfile