import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../Login/constants";
import { Button, Select, Icon, Input, Header, Switch } from "../Login/components";

const { width } = Dimensions.get("screen");

class Listgroup extends React.Component
{
  //state = {
  //  "switch-1": true,
  //  "switch-2": false
  //};

  constructor(props)
  {
    super(props);

    this.databaseRef = this.props.navigation.getParam('dataRef', null);
    this.key = this.props.navigation.getParam('personKey', "");
    this.groupName = "";
    this.groupCode = this.props.navigation.getParam('groupKey', "");

    this.state =
    {
      data: [
      {
        key: "",
        name: "",
        member: []
      }],
      
      groupNameField: "txt",
      groupCodeField: "txt",
    };
  }

  componentDidMount()
  {
    this.databaseRef.child('group').on('value', (snapshot) =>
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
      })

      this.setState({data: items});
    })
  }

  joinGroup()
  {
    if (this.groupCode != "")
    {
      console.warn("Already in a group");
      return;
    }

    var found = false;

    this.state.data.forEach(group =>
    {
      if (group.key == this.state.groupCodeField)
      {
        found = true;
        
        var updates = {};

        updates['/user/' + this.key + '/group'] = group.key;

        var newMemberKey = this.databaseRef.child('group').child(group.key).child('member').push().key;
        updates['/group/' + group.key + '/member/' + newMemberKey] = this.key;

        this.databaseRef.update(updates);

        this.groupName = group.name;
        this.groupCode = this.state.groupCodeField;
      }
    })

    if (found)
      console.warn('Joined');
    else
      console.warn('Wrong code');
  }

  generateRandomCode()
  {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    var result = '';

    for ( var i = 0; i < 7; i++ )
      result += characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
  }

  checkCodeDuplicate(code)
  {
    return new Promise(resolve =>
    {
      this.databaseRef.child('group').child(code).child('name').once('value', (snapshot) =>
      {
        if (snapshot.exists())
          resolve(true);
        else
          resolve(false);
      })
    })
  }

  async createGroup()
  {
    if (this.groupCode != "")
    {
      console.warn("Already in a group");
      return;
    }
    
    var found = false;

    this.state.data.forEach((group) =>
    {
      if (group.name == this.state.groupNameField)
        found = true;
    })

    if (found)
    {
      console.warn("Duplicate group name");
      return;
    }

    var groupKey = "";

    while (true)
    {
      var randomCode = this.generateRandomCode();

      var duplicate = await this.checkCodeDuplicate(randomCode);

      if (!duplicate)
      {
        groupKey = randomCode;
        break;
      }
    }

    this.databaseRef.child('group').child(groupKey).set(
    {
      leader: this.key,
      member: [],
      message: [],
      name: this.state.groupNameField,
    })

    var updates = {};

    updates['/user/' + this.key + '/group'] = groupKey;

    var newMemberKey = this.databaseRef.child('group').child(groupKey).child('member').push().key;
    updates['/group/' + groupKey + '/member/' + newMemberKey] = this.key;

    this.databaseRef.update(updates);

    console.warn("New group code: " + groupKey);

    this.groupName = this.state.groupNameField
    this.groupCode = groupKey;
  }

  goToGroupView()
  {
    if (this.groupCode == "")
    {
      console.warn("You're not in any group");
      return;
    }

    this.props.navigation.navigate('GroupView',
      {
        dataRef: this.databaseRef,
        groupCode: this.groupCode
      })
  }

  leaveGroup()
  {
    if (this.groupCode == "")
    {
      console.warn("Not in any group");
      return;
    }
    
    this.databaseRef.child('group').child(this.groupCode).child('member').once('value', snapshot =>
    {
      updates = {};

      updates['/user/' + this.key + '/group'] = "";

      snapshot.forEach(member =>
      {
        if (member.val().toString() == this.key)
          console.warn(member.val().toString());
          updates['/group/' + this.groupCode + '/member/' + member.key] = null;
      })

      this.databaseRef.update(updates);

      console.warn('Left group');
    })
  }

  toggleSwitch = switchId =>
    this.setState({ [switchId]: !this.state[switchId] });
  
  renderInputs = () => {
    return (
      <Block flex style={styles.group}>
          <Text bold size={30} style={styles.title}>
              YOUR GROUP
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder = "Pick a name for your group"

                style =
                {{
                  borderColor: argonTheme.COLORS.INFO,
                  borderRadius: 4,
                  backgroundColor: "#fff"
                }}

                iconContent = {<Block/>}
                onChangeText = {(text) => {this.setState({groupNameField: text});}}
              />
          </Block>
      </Block>
    );
  };

  renderButtons = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={30} style={styles.title}>
              YOUR GROUP
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder = "Pick a name for your group"

                style =
                {{
                  borderColor: argonTheme.COLORS.INFO,
                  borderRadius: 4,
                  backgroundColor: "#fff"
                }}

                iconContent = {<Block/>}
                onChangeText = {(text) => {this.setState({groupNameField: text});}}
              />
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder = "Input your new group code"

                style = 
                {{
                  borderColor: argonTheme.COLORS.INFO,
                  borderRadius: 4,
                  backgroundColor: "#fff"
                }}

                iconContent = {<Block/>}
                onChangeText = {(text) => {this.setState({groupCodeField: text});}}
              />
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button
              color = "default"
              style = {styles.button}
              onPress = {() => {this.createGroup()}}>
                CREATE
            </Button>
          </Block>

          <Block center>
            <Button
              color = "secondary"
              textStyle = {{ color: "black", fontSize: 12, fontWeight: "700" }}
              style = {styles.button}
              onPress = {() => {this.joinGroup()}}>
                JOIN
            </Button>
          </Block>

          <Block center>
            <Button
              color = "secondary"
              textStyle = {{ color: "black", fontSize: 12, fontWeight: "700" }}
              style = {styles.button}
              onPress = {() => {this.goToGroupView()}}>
                GROUP
            </Button>
          </Block>

          <Block center>
            <Button
              color = "secondary"
              textStyle = {{ color: "black", fontSize: 12, fontWeight: "700" }}
              style = {styles.button}
              onPress = {() => {this.leaveGroup()}}>
                LEAVE GROUP
            </Button>
          </Block>

          <Text bold size={20} style={styles.title}>
              Avaiable Group
          </Text>
          
          <Block center>
            <Button style={styles.button}>Group Faminly</Button>
          </Block>
          <Block center>
            <Button color="info" style={styles.button}>
              Group 1
            </Button>
          </Block>
          <Block center>
            <Button color="success" style={styles.button}>
            Group 2
            </Button>
          </Block>
          <Block center>
            <Button color="warning" style={styles.button}>
            Group AN CHOI
            </Button>
          </Block>
          <Block center>
            <Button color="error" style={styles.button}>
            Group Di Phuot
            </Button>
          </Block>
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

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {this.renderButtons()}
        </ScrollView>
      </Block>
    );
  }

  /*
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
  */
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
