import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
//https://oblador.github.io/react-native-vector-icons/
//https://ionicons.com/
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import { name as appName } from "../../app.json";

class SideDrawer extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableOpacity>
          <View style={styles.drawItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onClickInventoryScreen()}>
          <View style={styles.drawItem}>
            <Icon
              name={Platform.OS === "android" ? "md-share-alt" : "ios-share"}
              size={30}
              color="#aaa"
              style={styles.drawItemIcon}
            />
            <Text>Inventory</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  onClickInventoryScreen() {
    // Doesnt work - look aty the native kitchen sink eg to see how to get side drawer nav working
    this.props.navigator.res(appName + ".InventoryScreen");

    //this.props.navigator.resetTo({
    // screen: appName + ".InventoryScreen"
    //});

    //Navigation.na navigate("InventoryScreen");
    //this.props.navigation.navigate("InventoryScreen");
    // Navigation.showModal({
    //   component: {
    //     name: appName + ".InventoryScreen",
    //     passProps: {
    //       orientation: "landscape"
    //     }
    //   }
    // });
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  drawItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawItemIcon: {
    marginRight: 10
  }
});

export default SideDrawer;
