import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import RNCamera from "react-native-camera";

export default class BarcodeScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcode: ""
    };
  }

  onBarCodeRead = e => this.setState({ qrcode: e.data });

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}
          aspect={RNCamera.constants.Aspect.fill}
        >
          <Text
            style={{
              backgroundColor: "white"
            }}
          >
            {this.state.qrcode}
          </Text>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
