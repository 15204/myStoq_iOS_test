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

const db = firebase.firestore();

class InventoryComponent extends Component {
  constructor(props) {
    super(props);
  }

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
              style={{ backgroundColor: "white" }}
              //onItemPressed={() => props.onItemSelected(info.item.key)}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default InventoryComponent;
