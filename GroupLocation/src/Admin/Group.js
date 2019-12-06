import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../Login/constants";
import { Button, Select, Icon, Input, Header, Switch } from "../Login/components";
import { HeaderHeight } from "../Login/constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Group extends React.Component {
  render() {
    return (
      <Block flex style={styles.Group}>
        <Block flex>
          <ImageBackground
            source={Images.GroupBackground}
            style={styles.GroupContainer}
            imageStyle={styles.GroupBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.GroupCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={require('../image/Trum.jpg')}
                    style={styles.avatar}
                  />
                </Block>
                
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      TNT SE CS300
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Group Code: sdf78
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Leader: Hồ Minh Trí
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      Hẹn bàn project tại cafe 24h quận 7
                    </Text>
                  
                  </Block>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={20} color="Green">
                      Members
                    </Text>
                    
                  </Block>
                  <Block
                    row
                    style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                  >
                  </Block>
                  <Block flex>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
 
                
                  </Block>
                  <Block center>
                    <Button color="info" style={styles.button}>
                      Hồ Minh Trí
                    </Button>
                  </Block>
                  <Block center>
                    <Button color="success" style={styles.button}>
                    Nguyễn Minh Trí
                    </Button>
                  </Block>
                  <Block center>
                    <Button color="warning" style={styles.button}>
                    Nguyễn Thanh Tùng
                    </Button>
                  </Block>
                  <Block center>
                    <Button color="error" style={styles.button}>
                    Nguyễn Hoàng Tân
                    </Button>
                  </Block>
                  <Block center>
                    <Button color="error" style={styles.button}>
                    Đỗ Trí Nhân
                    </Button>
                  </Block>
    

                </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
        
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  Group: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  GroupContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  GroupBackground: {
    width: width,
    height: height / 2
  },
  GroupCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Group;
