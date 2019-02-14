import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AppStore
} from "react-native";
import { Camera } from "react-native-camera";

const projectId = "barcodes-5b881";

const { height, width } = Dimensions.get("window");
//const maskRowHeight = Math.round((AppStore.height - 300) / 20);
const maskRowHeight = Math.round(500 / 20);
const maskColWidth = (width - 300) / 2;

export default class CameraScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          onBarCodeRead={this.props._onBarCodeRead}
          style={styles.cameraView}
          aspect={Camera.constants.Aspect.fill}
          playSoundOnCapture
        >
          <View style={styles.maskOutter}>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame
              ]}
            />
            <View style={[{ flex: 30 }, styles.maskCenter]}>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            </View>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame
              ]}
            />
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraView: {
    flex: 1,
    justifyContent: "flex-start"
  },
  maskOutter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  maskInner: {
    width: 300,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1
  },
  maskFrame: {
    backgroundColor: "rgba(1,1,1,0.6)"
  },
  maskRow: {
    width: "100%"
  },
  maskCenter: { flexDirection: "row" }
});
