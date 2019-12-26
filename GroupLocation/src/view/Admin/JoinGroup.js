import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../Login/constants";
import { Button, Select, Icon, Input, Header, Switch } from "../Login/components";

import {NavigationActions} from 'react-navigation'

const { width } = Dimensions.get("screen");

var databaseRef = null;

class Listgroup extends React.Component
{
  //state = {
  //  "switch-1": true,
  //  "switch-2": false
  //};

  joinGroup()
  {
    this.state.data.forEach(group =>
    {
      var found = false;

      if (group.key == this.state.code)
      {
        found = true;
        
        var updates = {};

        updates['/user/' + this.state.personKey + '/group'] = group.key;

        var newMemberKey = databaseRef.child('group').child(group.key).child('member').push().key;
        updates['/group/' + group.key + '/member/' + newMemberKey] = this.state.personKey;

        var value = ""
        databaseRef.child('user').child(this.state.personKey).child('grouplist').on('value', snapshot => {
          value =  snapshot.val().toString()
        });

        databaseRef.child('user').child(this.state.personKey).child('grouplist').set(value + ',' + group.key)
        

        databaseRef.update(updates);
      }

      if (found)
        console.warn('Joined');
      else
        console.warn('Wrong code');
    })
  }

  constructor(props)
  {
    super(props);

    databaseRef = this.props.navigation.getParam('dataRef', null);
    var key = this.props.navigation.getParam('personKey', "");

    var groupList = ""

    this.state =
    {
      data: [
      {
        key: "",
        name: "",
        member: []
      }],
      currentGroup: [],
      code: "txt",
      personKey: key,
      groupList: "",
      groups: []
    };
  }

  componentDidMount()
  {
    databaseRef.child('group').on('value', (snapshot) =>
    {
      var items = [];
      
      snapshot.forEach((child1) =>
      {
        var childKey = child1.key;
        var groupName = child1.child('name').val().toString();

        var groupMembers = [];

        child1.child('member').forEach((child2) =>
        {
          var memberCode = child2.val().toString();
          groupMembers.push(memberCode);
        })

        items.push(
        {
          key: childKey,
          name: groupName,
          member: groupMembers
        });

        // do current groups
        


      })

      console.warn(items);

      this.setState({data: items});
    })

    databaseRef.child('user').child(key).child('grouplist').on('value', snapshot1 => {
      
      console.warn("Key " + key)
      console.warn(snapshot1)
      
      //this.setState({groupList: ""})

      //console.warn("GroupList  " + this.state.groupList)
      
      databaseRef.child('group').on('value', (snapshot) => {
        
        var items = [];
      
        snapshot.forEach((child1) =>
        {
          console.warn("GrouoList " + this.state.groupList)
          if (snapshot1.val().toString().includes(child1.key)) {
            items.push({
              key: child1.key,
              name: child1.child('name').val().toString()
            })
          }
        })

        this.setState({groups: items})
      })

    })
  }

  gotoNewGroup = (id) => {

    databaseRef.child('user').child(key).child('group').set(id);

    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Map', params: {personKey: key, groupKey: id} },)], 0);
  }

  renderGroup = () => {

    return this.state.groups.map(group => {
      return (
        <Block center>
          <Button style={styles.button}
                  onPress={() => this.gotoNewGroup(group.key)}>
            {group.name}
          </Button>
        </Block>
      )
    })
  }

  toggleSwitch = switchId =>
    this.setState({ [switchId]: !this.state[switchId] });

  renderButtons = () => {
    return (
      <Block flex>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          
          <Block center>
            <Button
              color = "secondary"
              textStyle = {{ color: "black", fontSize: 12, fontWeight: "700" }}
              style = {styles.button}
              onPress = {() => {this.joinGroup()}}>
                JOIN
            </Button>
            <Text bold size={20} style={styles.title}>
              Avaiable Group
            </Text>
          </Block>

          {this.renderGroup()}
          
          
          <Block row space="evenly">
            <Block flex left>
              <Select
                defaultIndex={1}
                options={["01", "02", "03", "04", "05"]}
              />
            </Block>
            <Block flex center>
              <Button small center color="default" style={styles.optionsButton}>
                DELETE
              </Button>
            </Block>
            <Block flex={1.25} right>
              <Button center color="default" style={styles.optionsButton}>
                SAVE FOR LATER
              </Button>
            </Block>
          </Block>
        </Block>
        
      </Block>
    );
  };

  renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Typography
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h1
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 1
          </Text>
          <Text
            h2
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 2
          </Text>
          <Text
            h3
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 3
          </Text>
          <Text
            h4
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 4
          </Text>
          <Text
            h5
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 5
          </Text>
          <Text
            p
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Paragraph
          </Text>
          <Text muted>This is a muted paragraph.</Text>
        </Block>
      </Block>
    );
  };

  renderInputs = () => {
    return (
      <Block flex style={styles.group}>
          <Text bold size={30} style={styles.title}>
              YOUR GROUP
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder="Pick a name for your group"
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

  renderSwitches = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Visiable Status
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block
            row
            middle
            space="between"
            style={{ marginBottom: theme.SIZES.BASE }}
          >
            <Text size={14}>Switch is ON</Text>
            <Switch
              value={this.state["switch-1"]}
              onValueChange={() => this.toggleSwitch("switch-1")}
            />
          </Block>
          <Block row middle space="between">
            <Text size={14}>Switch is OFF</Text>
            <Switch
              value={this.state["switch-2"]}
              onValueChange={() => this.toggleSwitch("switch-2")}
            />
          </Block>
        </Block>
      </Block>
    );
  };

  renderSocial = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          SHARE GROUP CODE
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row center space="between">
            <Block flex middle right>
              <GaButton
                round
                onlyIcon
                shadowless
                icon="facebook"
                iconFamily="Font-Awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.FACEBOOK}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle center>
              <GaButton
                round
                onlyIcon
                shadowless
                icon="twitter"
                iconFamily="Font-Awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.TWITTER}
                style={[styles.social, styles.shadow]}
              />
            </Block>
            <Block flex middle left>
              <GaButton
                round
                onlyIcon
                shadowless
                icon="dribbble"
                iconFamily="Font-Awesome"
                iconColor={theme.COLORS.WHITE}
                iconSize={theme.SIZES.BASE * 1.625}
                color={theme.COLORS.DRIBBBLE}
                style={[styles.social, styles.shadow]}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {this.renderInputs()}
          {this.renderButtons()}
          
          {this.renderSocial()}
          {this.renderSwitches()}
        </ScrollView>
      </Block>
    );
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
    paddingTop: theme.SIZES.BASE * 2
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

export default Listgroup;
