import React, { Component } from "reactn";
import { View } from "react-native";
import QRScanner from "../components/QrScanner/QRScanner";

import InventoryComponent from "./InventoryComponent";
import { RNCamera } from "react-native-camera";
import BarcodeFinder from "./BarcodeFinder";
import * as utils from "../shared/utility";
import Sound from "react-native-sound";
import * as BarcodeParser from "../shared/BarcodeParser";

class ScanInventoryScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  constructor(props) {
    super(props);

    this.state = {
      //scanable: true,
      barcode: null,
      seconds: 3,
      //onCodeDataRead: debounce(2000, true, this.onBarCodeDataRead.bind(this)),
      borderColor: "green",
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true
      }
    };

    this.scannerDelay = 1000;
    this.secondsRemaining = this.state.seconds;
    this.intervalHandle;
    this.scanable = true;
    // method that triggers the countdown functionality

    // this.cameraAttrs = {
    //   ref: ref => {
    //     this.camera = ref;
    //   },
    //   style: styles.preview,
    //   type: RNCamera.Constants.Type.back,
    //   //barCodeTypes: [RNCamera.Constants.BarCodeType.qr],
    //   onBarCodeRead: ({ e }) => {
    //     this.onBarCodeDataRead(e);
    //   }
    // };

    this.scanSound = new Sound("scanner.wav", Sound.MAIN_BUNDLE, null);
    this.errorSound = new Sound("error.wav", Sound.MAIN_BUNDLE, null);
    //this.expiredSound = new Sound("incorrect.wav", Sound.MAIN_BUNDLE, null);

    //bind the setOnNavigatorEvent to our local event below
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    //detect when we navigate to this page and re-load our places
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        // Orientation.lockToLandscape();
        //console.log("loading places");
        //TO DO - Load
        //this.props.onLoadPlaces();
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

  onBarCodeDataRead = data => {
    console.log(data.bounds);
    let bcodeObj = {};
    try {
      bcodeObj = BarcodeParser.parseBarcode(data.data);
      console.log(bcodeObj);
    } catch (e) {
      console.log(e);
    }

    this.addInventory(data.data);
  };

  mockAddInventory = () => {
    this.addInventory("0112345678901266101706011718063021987654321");
  };

  addInventory = bcode => {
    console.log(bcode);

    //Only interested in StockMe GS1 codes
    //if (bcode.length != BARCODE_LENGTH) return;

    //Product lookup
    let productId = bcode.substring(12, 16);

    let prod = null;

    if (productId) {
      prod = this.global.products.find(function(x) {
        return x.ProductId.toString() === productId;
      });
    }

    let invItems = this.global.inventory.slice();

    if (prod) {
      this.scanSound.play();

      let inv = invItems.find(function(x) {
        return x.ProductId === prod.ProductId;
      });
      if (inv === undefined) {
        //Add new item
        let item = {
          ...prod,
          Qty: 1
        };
        invItems = this.global.inventory.concat(item);
        this.setState({ barcode: item });
      } else {
        //Incrament qty
        inv.Qty++;
        this.setState({ barcode: inv });
      }
    } else {
      this.errorSound.play();

      var key = utils.createGuid();
      console.log(key);
      prod = {
        ProductId: key,
        Description: bcode,
        BarCode: bcode,
        key: key
      };
      invItems = this.global.inventory.concat(prod);
      this.setState({ barcode: prod });
    }
    this.setGlobal({ inventory: invItems });
  };

  getSumQty = () => {
    let total = 0;
    this.global.inventory.map(x => {
      total += x.Qty;
    });
    return total;
  };

  // renderCamera = () => {
  //   return <Scanner onBarCodeDataRead={e => this.onBarCodeDataRead(e)} />;
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <QRScanner
          onRead={e => this.onBarCodeDataRead(e)}
          reactivate={true}
          reactivateTimeout={this.scannerDelay}
          scanBarAnimateTime={1000}
          rectHeight={80}
          rectWidth={600}
          captureAudio={false}
          // renderBottomView={this.renderInventoryScreen}
        />
        <View style={{ flex: 3 }}>
          <InventoryComponent />
        </View>
      </View>
    );
    //  return <Scanner onBarCodeDataRead={e => this.onBarCodeDataRead(e)} />;
    // return (
    //   <TestRatios
    //     onRead={e => this.onBarCodeDataRead(e)}
    //     reactivate={true}
    //     reactivateTimeout={3000}
    //   />
    // );
  }
}

const styles = {
  controlsContainer: {
    flex: 1,
    flexDirection: "column"
  },
  topSection: {
    alignItems: "flex-start"
  },

  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  overlay: {
    position: "absolute",
    padding: 16,
    right: 0,
    left: 0,
    alignItems: "center"
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }
};
export default ScanInventoryScreen;
