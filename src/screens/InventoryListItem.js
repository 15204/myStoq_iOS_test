import React, { Component } from "reactn";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

class inventoryListItem extends Component {
  constructor(props) {
    super(props);
  }

  updateQty = qty => {
    let invItems = this.global.inventory.slice();
    let inv = invItems.find(x => {
      return x.ProductId === this.props.productId;
    });
    if (inv !== undefined) {
      if (inv.Qty + 1 * qty > 0) {
        inv.Qty += 1 * qty;
        this.setGlobal({ inventory: invItems });
      }
    }
  };

  deleteItem = () => {
    let invItems = this.global.inventory.filter(
      x => x.ProductId !== this.props.productId
    );
    this.setGlobal({ inventory: invItems });
  };

  addQty = () => {
    this.updateQty(1);
  };

  reduceQty = () => {
    this.updateQty(-1);
  };

  render() {
    return (
      <TouchableOpacity style={{ flex: 1 }}>
        <View style={[styles.listItem, { paddingLeft: 12 }]}>
          <Text style={styles.text}>{this.props.productId}</Text>
          <Text style={styles.text}>{this.props.description}</Text>
          <Text style={styles.text}>{this.props.qty}</Text>
          <Text style={styles.text}>{this.props.comment}</Text>
          <TouchableOpacity onPress={() => this.updateQty(1)}>
            <Text style={styles.qty}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateQty(-1)}>
            <Text style={styles.qty}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.deleteItem}>
            <Text style={styles.qty}>x</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    height: 24,
    //marginBottom: 5,
    padding: 0,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    paddingRight: 8
  },
  qty: {
    paddingRight: 10,
    fontSize: 30,
    fontWeight: "bold"
    //alignContent: "right"
  }
});

export default inventoryListItem;
