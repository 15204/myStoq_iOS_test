import React, { Component } from "reactn";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList
} from "react-native";

import InventoryListItem from "./InventoryListItem";
import firebase from "../../Firebase";
import * as data from "../shared/data";
//import Orientation from "react-native-orientation";

const db = firebase.firestore();

class InventoryScreen extends Component {
  constructor(props) {
    super(props);
    //bind the setOnNavigatorEvent to our local event below
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.props.navigator.layout = { orientation: "landscape" };
  }

  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  onNavigatorEvent = event => {
    //detect when we navigate to this page and re-load our products
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        // Orientation.lockToLandscape();
        //Load inventory items here
        //console.log("loading products");
        // this.unsubscribe = this.productCollection.onSnapshot(
        //   this.loadProductsFromFirebase
        // );
      }
    }
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  uploadInventory = () => {
    data.uploadInventory(this.global.inventory).then(result => {
      //TODO - show confirmation msg
    });
  };

  render() {
    return (
      <View>
        <FlatList
          style={styles.listContainer}
          data={this.global.inventory}
          renderItem={info => (
            <InventoryListItem
              productId={info.item.ProductId}
              description={info.item.Description}
              qty={info.item.Qty}
              comment={info.item.Comment}
              //onItemPressed={() => props.onItemSelected(info.item.key)}
            />
          )}
        />
        <Button title="Upload" onPress={this.uploadInventory} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default InventoryScreen;
