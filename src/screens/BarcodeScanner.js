import React, { Component } from "reactn";
import { View, Text } from "react-native";

import Scanner from "../components/scanner/Scanner";
import QRScanner from "../components/QrScanner/QRScanner";

class BarcodeScanner extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  constructor(props) {
    super(props);

    //bind the setOnNavigatorEvent to our local event below
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  render() {
    return (
      <View>
        <Scanner />
        {/* <QRScanner flashMode={true} /> */}
      </View>
    );
  }
}

export default BarcodeScanner;
