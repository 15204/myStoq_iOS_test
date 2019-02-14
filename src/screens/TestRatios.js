import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration
} from "react-native";
import { RNCamera } from "react-native-camera";
import PropTypes from "prop-types";

const res = [
  { width: 240, height: 240 },
  { width: 240, height: 180 },
  { width: 240, height: 140 },
  { width: 180, height: 240 },
  { width: 140, height: 240 },
  { width: 140, height: 40 },
  { width: 40, height: 140 },
  { width: 500, height: 150 }
];

class TestRatios extends React.Component {
  static propTypes = {
    onRead: PropTypes.func.isRequired,
    vibrate: PropTypes.bool,
    reactivate: PropTypes.bool,
    reactivateTimeout: PropTypes.number
    // fadeIn: PropTypes.bool,
    // showMarker: PropTypes.bool,
    // cameraType: PropTypes.oneOf(['front', 'back']),
    // customMarker: PropTypes.element,
    // containerStyle: PropTypes.any,
    // cameraStyle: PropTypes.any,
    // markerStyle: PropTypes.any,
    // topViewStyle: PropTypes.any,
    // bottomViewStyle: PropTypes.any,
    // topContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    // bottomContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    // notAuthorizedView: PropTypes.element,
    // permissionDialogTitle: PropTypes.string,
    // permissionDialogMessage: PropTypes.string,
    // checkAndroid6Permissions: PropTypes.bool,
    // cameraProps: PropTypes.object,
  };

  static defaultProps = {
    onRead: () => console.log("QR code scanned!"),
    reactivate: false,
    vibrate: true,
    reactivateTimeout: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      width: res[0].width,
      height: res[0].height,
      scanning: false,
      ratio: undefined,
      remountCamera: false
    };
  }

  getCameraRatio = async () => {
    if (!this.state.ratio && this.cameraRef) {
      const ratios = await this.cameraRef.getSupportedRatiosAsync();
      console.log(ratios);
      this.setState({
        ratio: ratios[ratios.length - 1],
        remountCamera: true
      });
    }
  };

  // componentDidUpdate = () => {
  //   if (this.state.remountCamera) {
  //     setTimeout(() => {
  //       this.setState({ remountCamera: false });
  //     }, 500);
  //   }
  // };

  changeRes = () => {
    const i = (this.state.i + 1) % res.length;
    const { width, height } = res[i];
    this.setState({ i, width, height });
  };

  _setScanning = value => {
    this.setState({ scanning: value });
  };

  _handleBarCodeRead = e => {
    if (!this.state.scanning) {
      if (this.props.vibrate) {
        Vibration.vibrate();
      }
      this._setScanning(true);
      this.props.onRead(e);
      if (this.props.reactivate) {
        setTimeout(
          () => this._setScanning(false),
          this.props.reactivateTimeout
        );
      }
    }
  };

  reactivate = () => {
    this._setScanning(false);
  };

  render() {
    return (
      !this.state.remountCamera && (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <RNCamera
            ref={ref => (this.cameraRef = ref)}
            type={RNCamera.Constants.Type.back}
            onBarCodeRead={this._handleBarCodeRead.bind(this)}
            style={{
              width: this.state.width,
              height: this.state.height
              //top: -100
            }}
            ratio={this.state.ratio}
            // onCameraReady={this.getCameraRatio}
          />
          <TouchableOpacity
            onPress={this.changeRes}
            style={{
              flex: 0,
              backgroundColor: "#ccc",
              borderRadius: 5,
              padding: 15,
              paddingHorizontal: 20,
              alignSelf: "center",
              margin: 20
            }}
          >
            <Text>Change Res</Text>
          </TouchableOpacity>
          <View>
            <Text>
              {this.state.width} {this.state.height}
            </Text>
          </View>
        </View>
      )
    );
  }
}

export default TestRatios;
