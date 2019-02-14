"use strict";

import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
  View
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import FillToAspectRatio from "./FillToAspectRatio";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

//console.disableYellowBox = true;
class Scanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashLightMode: 1
    };
    this.cameraAttrs = {
      flashMode: 1
    };
  }

  onSuccess(e) {
    this.props.onBarCodeDataRead(e);
    // Linking.openURL(e.data).catch(err =>
    //   console.error("An error occured", err)
    // );
  }

  makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  };

  renderCustomMarker = () => {
    return (
      <View style={styles.rectangleContainer}>
        <View style={styles.topOverlay}>
          <Text style={{ fontSize: 30, color: "white" }}>QR CODE SCANNER</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.leftAndRightOverlay} />

          <View style={styles.rectangle}>
            <Icon
              name="ios-qr-scanner"
              size={SCREEN_WIDTH * 0.73}
              color={iconScanColor}
            />
            <Animatable.View
              style={styles.scanBar}
              direction="alternate-reverse"
              iterationCount="infinite"
              duration={1700}
              easing="linear"
              animation={this.makeSlideOutTranslation(
                "translateY",
                SCREEN_WIDTH * -0.54
              )}
            />
          </View>

          <View style={styles.leftAndRightOverlay} />
        </View>

        <View style={styles.bottomOverlay} />
      </View>
    );
  };

  toggleFlash = () => {
    this.setState({
      flashLightMode: this.state.flashLightMode === 1 ? 2 : 1
    });
  };

  render() {
    return (
      // <FillToAspectRatio>
      <View style={{ flex: 0 }}>
        <QRCodeScanner
          topContent={
            <View style={styles.topContent}>
              <Text style={styles.buttonText}>Top Content</Text>
            </View>
          }
          bottomContent={
            <View style={styles.bottomContent}>
              <TouchableOpacity onPress={this.toggleFlash}>
                <Text style={styles.buttonText}>
                  Light {this.state.flashLightMode === 1 ? "On" : "Off"}
                </Text>
              </TouchableOpacity>
            </View>
          }
          onRead={this.onSuccess.bind(this)}
          showMarker
          markerStyle={{ width: 350, height: 150 }}
          //customMarker={this.renderCustomMarker}
          // cameraStyle={{
          //   flex: 0,
          //   justifyContent: "flex-end",
          //   flexDirection: "row",
          //   alignItems: "center"
          //   //top: 100,
          //   // marginBottom: 100
          //   //height: SCREEN_HEIGHT,
          //   //width: SCREEN_WIDTH
          // }}
          reactivate={true}
          reactivateTimeout={3000}
          cameraProps={{ flashMode: this.state.flashLightMode }}
        />
      </View>
      //</FillToAspectRatio>
    );
  }
}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";

const styles = {
  centerText: {
    flex: 1,
    fontSize: 18,
    top: 0,
    borderWidth: 2,
    borderColor: "green",
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  bottomContent: {
    flex: 2,
    padding: 16,
    height: 350,
    width: 420,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red"
  },
  topContent: {
    flex: 1,
    padding: 16,
    height: 300,
    width: 420,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red"
  },
  buttonTouchable: {
    padding: 16,
    height: 250,
    width: 500,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red"
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
};

export default Scanner;
