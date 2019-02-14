import React, { Component, setGlobal } from "reactn";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";

import ProductList from "./ProductList";
import firebase from "../../Firebase";
import * as data from "../shared/data";
//import Orientation from "react-native-orientation";

const db = firebase.firestore();

setGlobal({
  products: [],
  inventory: [],
  invItem: null
});

class ProductScreen extends Component {
  constructor(props) {
    super(props);
    //bind the setOnNavigatorEvent to our local event below
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.productCollection = db.collection("Product");
    this.unsubscribe = null;
  }

  loadProductsFromFirebase = querySnapshot => {
    const fetchedProducts = [];
    querySnapshot.forEach(doc => {
      const { BarCode, Description, ProductId } = doc.data();
      fetchedProducts.push({
        BarCode,
        Description,
        ProductId,
        key: ProductId.toString()
      });
    });

    this.saveProductsToState(fetchedProducts);
  };

  saveProductsToState = products => {
    setGlobal({
      products: products
    });
    console.log("products in state: ", this.global.products);
  };

  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  onNavigatorEvent = event => {
    //detect when we navigate to this page and re-load our products
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        // Orientation.lockToPortrait();

        //console.log("loading products");
        this.unsubscribe = this.productCollection.onSnapshot(
          this.loadProductsFromFirebase
        );
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

  itemSelectedHandler = key => {
    const selProduct = this.global.products.find(prod => {
      return prod.key === key;
    });
    //https://wix.github.io/react-native-navigation/#/screen-api
    // this.props.navigator.push({
    //   screen: "mikeapp-places.PlaceDetailScreen",
    //   title: selPlace.name,
    //   passProps: {
    //     selectedPlace: selPlace
    //   }
    // });
    console.log("Selected product: ", selProduct);
  };

  //Upload dummy products to the DB and refresh state
  initProducts = () => {
    data.initProducts().then(result => {
      this.saveProductsToState(result);
    });
  };

  render() {
    return (
      <View>
        <ProductList
          products={this.global.products}
          onItemSelected={this.itemSelectedHandler}
        />
        <Button title="Init" onPress={this.initProducts} />
      </View>
    );
  }
}

export default ProductScreen;
