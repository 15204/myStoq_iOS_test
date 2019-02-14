import React, { Component } from "reactn";
import { StyleSheet, FlatList } from "react-native";

import InventoryListItem from "./InventoryListItem";

class InventoryList extends Component {
  render() {
    return (
      <FlatList
        style={styles.listContainer}
        data={this.global.inventory}
        renderItem={info => (
          <InventoryListItem
            productId={info.item.ProductId}
            description={info.item.Description}
            qty={info.item.Qty}
            comment={info.item.Comment}
            //onItemPressed={() => this.props.onItemSelected(info.item.key)}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default inventoryList;
