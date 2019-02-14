import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import PropTypes from "prop-types";

import {
  StyleSheet,
  View,
  Text,
  Image,
  Vibration,
  Platform,
  PixelRatio,
  StatusBar
} from "react-native";

import QRScannerView from "./QRScannerView";

const pixelRatio = PixelRatio.get();

/**
 * 扫描界面
 */
class QRScanner extends Component {
  constructor(props) {
    super(props);
    //通过这句代码屏蔽 YellowBox
    console.disableYellowBox = true;
    this.state = {
      scanning: false,
      barCodeSize: {}
    };
  }

  static defaultProps = {
    onRead: () => {},
    renderTopView: () => {}, //<View style={{ flex: 2, backgroundColor: "red" }} />,
    renderBottomView: () => {}, //(<View style={{ flex: 1, backgroundColor: "red" }} />),
    rectHeight: 200,
    rectWidth: 200,
    flashMode: false, // 手电筒模式
    finderX: 0, // Viewfinder Offset X
    finderY: 0, // Viewfinder Offset Y
    zoom: 0.2, // 缩放范围 0 - 1
    translucent: false,
    isRepeatScan: false,

    reactivate: false,
    vibrate: true,
    reactivateTimeout: 3000,
    captureAudio: false
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <RNCamera
          style={{
            flex: 1
          }}
          captureAudio={this.props.captureAudio} // captureAudio was recenetly introduced to RNCamer and broke permissions!!
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onBarCodeRead={this._handleBarCodeRead}
          //barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={
            !this.props.flashMode
              ? RNCamera.Constants.FlashMode.off
              : RNCamera.Constants.FlashMode.torch
          }
          zoom={this.props.zoom}
        >
          <View style={[styles.topButtonsContainer, this.props.topViewStyle]}>
            {this.props.renderTopView()}
          </View>
          <QRScannerView
            maskColor={this.props.maskColor}
            cornerColor={this.props.cornerColor}
            borderColor={this.props.borderColor}
            rectHeight={this.props.rectHeight}
            rectWidth={this.props.rectWidth}
            borderWidth={this.props.borderWidth}
            cornerBorderWidth={this.props.cornerBorderWidth}
            cornerBorderLength={this.props.cornerBorderLength}
            cornerOffsetSize={this.props.cornerOffsetSize}
            isCornerOffset={this.props.isCornerOffset}
            bottomHeight={this.props.bottomHeight}
            scanBarAnimateTime={this.props.scanBarAnimateTime}
            scanBarColor={this.props.scanBarColor}
            scanBarHeight={this.props.scanBarHeight}
            scanBarMargin={this.props.scanBarMargin}
            hintText={this.props.hintText}
            hintTextStyle={this.props.hintTextStyle}
            scanBarImage={this.props.scanBarImage}
            hintTextPosition={this.props.hintTextPosition}
            isShowScanBar={this.props.isShowScanBar}
            finderX={this.props.finderX}
            finderY={this.props.finderY}
            returnSize={this.barCodeSize}
          />
          <View
            style={[styles.bottomButtonsContainer, this.props.bottomViewStyle]}
          >
            {this.props.renderBottomView()}
          </View>
        </RNCamera>
      </View>
    );
  }

  isShowCode = false;

  barCodeSize = size => this.setState({ barCodeSize: size });

  returnMax = (a, b) => (a > b ? a : b);

  returnMin = (a, b) => (a < b ? a : b);

  _handleBarCodeRead = e => {
    console.log("READ");
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

  _setScanning = value => {
    this.setState({ scanning: value });
  };

  reactivate = () => {
    this._setScanning(false);
  };

  iosBarCode = e => {
    let x = Number(e.bounds.origin.x);
    let y = Number(e.bounds.origin.y);
    let width = e.bounds.size.width;
    let height = e.bounds.size.height;
    let viewMinX = this.state.barCodeSize.x - this.props.finderX;
    let viewMinY = this.state.barCodeSize.y - this.props.finderY;
    let viewMaxX =
      this.state.barCodeSize.x +
      this.state.barCodeSize.width -
      width -
      this.props.finderX;
    let viewMaxY =
      this.state.barCodeSize.y +
      this.state.barCodeSize.height -
      height -
      this.props.finderY;
    if (x > viewMinX && y > viewMinY && (x < viewMaxX && y < viewMaxY)) {
      if (this.props.isRepeatScan) {
        Vibration.vibrate();
        this.props.onRead(e);
      } else {
        if (!this.isShowCode) {
          this.isShowCode = true;
          Vibration.vibrate();
          this.props.onRead(e);
        }
      }
    }
  };

  androidBarCode = e => {
    // console.log(e.bounds);
    // let x = Number(e.bounds.origin[0].x);
    // let y = Number(e.bounds.origin[0].y);
    // let width = Number(e.bounds.origin[1].x) - x;
    // let height = y;
    // let viewMinX = this.state.barCodeSize.x - this.props.finderX;
    // let viewMinY = this.state.barCodeSize.y - this.props.finderY;
    // let viewMaxX =
    //   this.state.barCodeSize.x +
    //   this.state.barCodeSize.width -
    //   width -
    //   this.props.finderX;
    // let viewMaxY =
    //   this.state.barCodeSize.y +
    //   this.state.barCodeSize.height -
    //   height -
    //   this.props.finderY;
    // if (x > viewMinX && y > viewMinY && (x < viewMaxX && y < viewMaxY)) {
    if (this.props.isRepeatScan) {
      Vibration.vibrate();
      this.props.onRead(e);
    } else {
      if (!this.isShowCode) {
        this.isShowCode = true;
        Vibration.vibrate();
        this.props.onRead(e);
      }
    }
    //}
    // console.log(
    //   "x= ",
    //   x +
    //     " viewMinX= " +
    //     viewMinX +
    //     " y= " +
    //     viewMinY +
    //     " viewMaxX= " +
    //     viewMaxX +
    //     " viewMaxY= " +
    //     viewMaxY
    // );

    // if (x && y) {
    //   if (x > viewMinX && y > viewMinY && (x < viewMaxX && y < viewMaxY)) {
    //     if (this.props.isRepeatScan) {
    //       Vibration.vibrate();
    //       this.props.onRead(e);
    //     } else {
    //       if (!this.isShowCode) {
    //         this.isShowCode = true;
    //         Vibration.vibrate();
    //         this.props.onRead(e);
    //       }
    //     }
    //   }
    // }
  };

  // _handleBarCodeRead = e => {
  // switch (Platform.OS) {
  //   case "ios":
  //     this.iosBarCode(e);
  //     break;
  //   case "android":
  //     this.androidBarCode(e);
  //     break;
  //   default:
  //     break;
  // }
  // };
}

const styles = StyleSheet.create({
  topButtonsContainer: {
    position: "absolute",
    height: 100,
    top: 0,
    left: 0,
    right: 0
  },
  bottomButtonsContainer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0
  }
});

QRScanner.propTypes = {
  isRepeatScan: PropTypes.bool,
  onRead: PropTypes.func,
  maskColor: PropTypes.string,
  borderColor: PropTypes.string,
  cornerColor: PropTypes.string,
  borderWidth: PropTypes.number,
  cornerBorderWidth: PropTypes.number,
  cornerBorderLength: PropTypes.number,
  rectHeight: PropTypes.number,
  rectWidth: PropTypes.number,
  isCornerOffset: PropTypes.bool, //边角是否偏移
  cornerOffsetSize: PropTypes.number,
  bottomHeight: PropTypes.number,
  scanBarAnimateTime: PropTypes.number,
  scanBarColor: PropTypes.string,
  scanBarImage: PropTypes.any,
  scanBarHeight: PropTypes.number,
  scanBarMargin: PropTypes.number,
  hintText: PropTypes.string,
  hintTextStyle: PropTypes.object,
  hintTextPosition: PropTypes.number,
  renderTopView: PropTypes.func,
  renderBottomView: PropTypes.func,
  isShowScanBar: PropTypes.bool,
  topViewStyle: PropTypes.object,
  bottomViewStyle: PropTypes.object,
  flashMode: PropTypes.bool,
  finderX: PropTypes.number,
  finderY: PropTypes.number,
  zoom: PropTypes.number,
  translucent: PropTypes.bool,
  reactivate: PropTypes.bool,
  reactivateTimeout: PropTypes.number,
  captureAudio: PropTypes.bool
};

export default QRScanner;
