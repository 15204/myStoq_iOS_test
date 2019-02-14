import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ProductListItem from "./ProductListItem";

const productList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.products}
      renderItem={info => (
        <ProductListItem
          productId={info.item.ProductId}
          description={info.item.Description}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default productList;
