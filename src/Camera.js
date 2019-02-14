"use strict";
import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { RNCamera } from "react-native-camera";
//import CameraScreen from "./CameraScreen";
import firebase from "../Firebase";
import * as data from "./shared/data";

const projectId = "barcodes-5b881";
const db = firebase.firestore();

export default class Camera extends Component {
  constructor(props) {
    super(props);

    //Uncomment for debugging
    //firebase.firestore.setLogLevel("debug");
    this.productCollection = db.collection("Product");
    this.unsubscribe = null;

    this.state = {
      inventory: [],
      bcode: "",
      flashMode: RNCamera.Constants.FlashMode.off,
      products: []
    };
  }

  loadProductsFromFirebase = querySnapshot => {
    const fetchedProducts = [];
    querySnapshot.forEach(doc => {
      const { BarCode, Description, ProductId } = doc.data();
      fetchedProducts.push({
        BarCode,
        Description,
        ProductId
      });
    });

    this.saveProductsToState(fetchedProducts);
  };

  saveProductsToState = products => {
    this.setState(prevState => {
      return {
        ...prevState,
        products: products
      };
    });
    console.log("products in state: ", this.state.products);
  };

  componentDidMount() {
    //Load Product master
    this.unsubscribe = this.productCollection.onSnapshot(
      this.loadProductsFromFirebase
    );
  }

  onBarCodeRead = e => {
    this.addInventory(e.data);
  };

  addInventory = bcode => {
    this.setState(prevState => {
      let product = {
        CreatedDate: new Date(),
        Email: "mike@ss.com",
        ProductId: bcode,
        Qty: 1,
        SiteId: 1
      };
      let inventory = prevState.inventory.concat(product);
      return {
        ...prevState,
        bcode: bcode,
        inventory: inventory
      };
    });
    //console.log(this.state);
  };

  //https://www.djamware.com/post/5bbcd38080aca7466989441b/react-native-firebase-tutorial-build-crud-firestore-app#ch5
  uploadData = () => {
    let data = JSON.stringify(this.state.inventory);
    db.collection("Inventory")
      .add(data)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong adding data, please try again!");
      });
  };

  uploadData_old = () => {
    let url = "https://" + projectId + ".firebaseio.com/Inventory.json";
    let data = JSON.stringify(this.state.inventory);

    console.log("sending data to " + url);
    console.log(data);

    fetch(url, {
      method: "POST",
      body: data
    })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
      });
  };

  //Upload dummy products to the DB and refresh state
  initProducts = () => {
    data.initProducts().then(result => {
      this.saveProductsToState(result);
    });
  };

  render() {
    return (
      // <CameraScreen _onBarCodeRead={this.onBarCodeRead} />

      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flashMode}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onBarCodeRead={this.onBarCodeRead}
          playSoundOnCapture={true}
          on
        />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}>SNAP IT</Text>
            <Text style={{ backgroundColor: "white" }}>
              {this.state.bcode + ": " + this.state.inventory.length}
            </Text>
          </TouchableOpacity>
          <Button title="Upload" onPress={this.uploadData} />
          <Button title="Init" onPress={this.initProducts} />
        </View>
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.addProduct(new Date().toString());
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});
