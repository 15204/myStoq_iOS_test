import React, { PureComponent } from "reactn";
import { StyleSheet, View } from "react-native";
import BarcodeScanner from "./BarcodeScanner";
import BarcodeDetails from "./BarcodeDetails";

class ScannerComponent extends PureComponent {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  constructor(props) {
    super(props);
    //bind the setOnNavigatorEvent to our local event below
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    this.state = {
      product: null,
      qty: 1,
      comment: null,
      currentScreen: 1
    };
  }

  // componentWillMount() {
  //   this.resetState();
  // }

  resetState = () => {
    this.setState({
      product: null,
      qty: 1,
      comment: null
    });
  };

  onNavigatorEvent = event => {
    console.log("Want to show...");

    //detect when we navigate to this page and re-set state
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        console.log("Showing...");
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

  renderBarcodeScanner = () => {
    return <BarcodeScanner onScan={this.onBarCodeRead} />;
  };

  renderBarcodeDetail = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        currentScreen: 2
      };
    });

    console.log("qty= " + this.state.qty);
    return (
      <BarcodeDetails
        qty={this.state.qty}
        comment={this.state.comment}
        product={this.state.product}
        onCloseDetails={this.onDetailsClosed}
      />
    );
  };

  onDetailsClosed = data => {
    console.log(data);
    if (data && data.qty != 0) {
      this.addInventory(data);
    }

    this.setState(prevState => {
      return {
        ...prevState,
        currentScreen: 1
      };
    });
  };

  onBarCodeRead = e => {
    console.log("barcode read");
    this.loadProductDetails(e.data);
  };

  loadProductDetails = barcode => {
    console.log("Loading products...");
    //if (this.state.currentScreen === 2) return;

    let productId = barcode.substring(12, 16);

    let product = this.getProductById(productId);

    this.setState(prevState => {
      return {
        ...prevState,
        product: product,
        qty: 1,
        comment: null,
        currentScreen: 2
      };
    });
  };

  getProductById = productId => {
    let prod = this.global.products.find(function(x) {
      return x.ProductId.toString() === productId;
    });
    return prod;
  };

  addInventory = data => {
    let invItems = this.global.inventory.slice();
    let inv = invItems.find(function(x) {
      return x.ProductId === data.productId;
    });

    if (inv === undefined) {
      //Add new item
      let item = {
        ...this.state.product,
        Qty: data.qty,
        Comment: data.comment
      };
      invItems = this.global.inventory.concat(item);
      // this.setState({ barcode: item });
    } else {
      //Incrament qty & add / update comment
      inv.Qty += data.qty;
      inv.Comment = data.comment;
    }
    this.setGlobal({ inventory: invItems });
  };

  render() {
    console.log("rendering..." + this.state.currentScreen);
    let output =
      this.state.currentScreen === 1
        ? this.renderBarcodeScanner()
        : this.renderBarcodeDetail();

    return <View style={styles.container}>{output}</View>;
  }
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

export default ScannerComponent;
