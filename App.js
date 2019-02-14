import { Navigation } from "react-native-navigation";
import { name as appName } from "./app.json";
import ProductScreen from "./src/screens/Product";
import ScanInventoryScreen from "./src/screens/ScanInventory";
import BarcodeScannerScreen from "./src/screens/BarcodeScanner";
import ScannerComponent from "./src/components/scanner/ScannerComponent";
import InventoryScreen from "./src/screens/Inventory";
import SideDrawer from "./src/screens/SideDrawer";
import startMainTabs from "./src/screens/startMainTabs";

Navigation.registerComponent(appName + ".ProductScreen", () => ProductScreen);
Navigation.registerComponent(
  appName + ".BarcodeScannerScreen",
  () => BarcodeScannerScreen
);
Navigation.registerComponent(
  appName + ".ScanInventoryScreen",
  () => ScanInventoryScreen
);
Navigation.registerComponent(
  appName + ".ScannerComponent",
  () => ScannerComponent
);
Navigation.registerComponent(appName + ".SideDrawer", () => SideDrawer);
Navigation.registerComponent(
  appName + ".InventoryScreen",
  () => InventoryScreen
);

export default () => {
  Navigation.startSingleScreenApp({
    screen: {
      //screen: appName + ".BarcodeScannerScreen",
      //title: "Scan Inventory"
      screen: appName + ".ScanInventoryScreen",
      title: "Inventory Management"
    }
  });
  startMainTabs();
};
