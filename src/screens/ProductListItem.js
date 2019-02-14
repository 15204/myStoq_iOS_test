import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const productListItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Text style={styles.text}>{props.productId}</Text>
      <Text style={styles.text}>{props.description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    paddingRight: 8
  }
});

export default productListItem;
