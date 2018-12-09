import React, { Component } from "react";
import { observer } from "mobx-react";
import authStore from "../stores/authStore";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  CustomIcon,
  Icon,
  View,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Right,
  Left,
  Footer
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  AppRegistry
} from "react-native";
import Store from "../stores/store";
import { ScrollView, scrollViewHorizontal } from "react-native-gesture-handler";

class RatingPage extends Component {
  static navigationOptions = {
    title: "Rating Page",
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      rate: 0
    };
  }

  poorRate() {
    this.setState({ rate: 1 });
  }

  AvaregeRate() {
    this.setState({ rate: 2 });
  }

  GoodRate() {
    this.setState({ rate: 3 });
  }

  VeryGoodRate() {
    this.setState({ rate: 4 });
  }

  ExellentRate() {
    this.setState({ rate: 5 });
  }

  confirmPressed(doctorID, rate, user) {
    Store.postRate(doctorID, rate, user);
    alert("your rate has been Submited");
    this.props.navigation.goBack();
  }

  render() {
    // console.log(authStore.user.user_id)
    let doctorID = this.props.navigation.getParam("id");
    let iconName1;
    let iconName2;
    let iconName3;
    let iconName4;
    let iconName5;
    if (this.state.rate === 0) {
      iconName1 = "ios-star-outline";
      iconName2 = "ios-star-outline";
      iconName3 = "ios-star-outline";
      iconName4 = "ios-star-outline";
      iconName5 = "ios-star-outline";
    } else if (this.state.rate === 1) {
      iconName1 = "ios-star";
      iconName2 = "ios-star-outline";
      iconName3 = "ios-star-outline";
      iconName4 = "ios-star-outline";
      iconName5 = "ios-star-outline";
    } else if (this.state.rate === 2) {
      iconName1 = "ios-star";
      iconName2 = "ios-star";
      iconName3 = "ios-star-outline";
      iconName4 = "ios-star-outline";
      iconName5 = "ios-star-outline";
    } else if (this.state.rate === 3) {
      iconName1 = "ios-star";
      iconName2 = "ios-star";
      iconName3 = "ios-star";
      iconName4 = "ios-star-outline";
      iconName5 = "ios-star-outline";
    } else if (this.state.rate === 4) {
      iconName1 = "ios-star";
      iconName2 = "ios-star";
      iconName3 = "ios-star";
      iconName4 = "ios-star";
      iconName5 = "ios-star-outline";
    } else if (this.state.rate === 5) {
      iconName1 = "ios-star";
      iconName2 = "ios-star";
      iconName3 = "ios-star";
      iconName4 = "ios-star";
      iconName5 = "ios-star";
    }

    if (!authStore.isAuthenticated) {
      return (
        <View style={styles.notlogin}>
          <Text>You Need To LogIn Or Register To Rate Any Dactor</Text>
        </View>
      );
    }
    return (
      <Grid
        style={{
          backgroundColor: "white"
        }}
      >
        <Row size={4} style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              How would you describe your visit to Doctor:
            </Text>
          </View>
        </Row>
        <Row size={4} style={{ flex: 1, justifyContent: "center" }}>
          <Button
            transparent
            style={styles.StarButton}
            onPress={() => this.poorRate()}
          >
            <Icon large name={iconName1} style={styles.startStyle} />
          </Button>
          <Button
            transparent
            style={styles.StarButton}
            onPress={() => this.AvaregeRate()}
          >
            <Icon large name={iconName2} style={styles.startStyle} />
          </Button>
          <Button
            transparent
            style={styles.StarButton}
            onPress={() => this.GoodRate()}
          >
            <Icon large name={iconName3} style={styles.startStyle} />
          </Button>
          <Button
            transparent
            style={styles.StarButton}
            onPress={() => this.VeryGoodRate()}
          >
            <Icon large name={iconName4} style={styles.startStyle} />
          </Button>
          <Button
            transparent
            style={styles.StarButton}
            onPress={() => this.ExellentRate()}
          >
            <Icon large name={iconName5} style={styles.startStyle} />
          </Button>
        </Row>
        <Row size={2} style={{ flex: 1, justifyContent: "center" }}>
          <Button
            style={styles.ConfirmButton}
            onPress={() =>
              this.confirmPressed(
                doctorID,
                this.state.rate,
                authStore.user.user_id
              )
            }
          >
            <Text style={styles.ConfirmButtomText}>Confirm</Text>
          </Button>
        </Row>
      </Grid>
    );
  }
}

export default observer(RatingPage);

const styles = StyleSheet.create({
  text: {
    // color: "#000",
    fontSize: 30,
    fontWeight: "bold"
  },
  ConfirmButtomText: {
    // color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  iconsStyle: {
    width: 28,
    height: 28,
    justifyContent: "flex-start"
  },
  centerView: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  startStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    color: "#FFD700",
    flexDirection: "row"
  },
  StarButton: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
    // color:"#00bfff"
  },
  ConfirmButton: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00bfff"
  },
  notlogin: {
    flex: 1,
    backgroundColor: "white",
    // alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});