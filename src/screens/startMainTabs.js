import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
//https://oblador.github.io/react-native-vector-icons/
import Icon from "react-native-vector-icons/Ionicons";
import { name as appName } from "../../app.json";

//REF https://wix.github.io/react-native-navigation/#/screen-api
const startTabs = () => {
  //Promise.all returns an array promises
  Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-barcode" : "ios-barcode",
      30
    ),
    Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-share-alt" : "ios-share",
      30
    )
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: appName + ".ProductScreen",
          label: "Products",
          title: "Products",
          icon: sources[0], //the 1st element in the promise result array
          //note the following buttons have to wired up to our side drawer - if not, android crashes
          //This is done by listening to navigator events in the various screens
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        // {
        //   screen: appName + ".ScannerComponent",
        //   label: "Scan Inventory",
        //   title: "Scan Inventory",
        //   icon: sources[1],
        //   navigatorButtons: {
        //     leftButtons: [
        //       {
        //         icon: sources[2],
        //         title: "Menu",
        //         id: "sideDrawerToggle"
        //       }
        //     ]
        //   }
        // },
        {
          screen: appName + ".ScanInventoryScreen",
          label: "Scan Inventory",
          title: "Scan Inventory",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        // {
        //   screen: appName + ".BarcodeScannerScreen",
        //   label: "Scan Inventory",
        //   title: "Scan Inventory",
        //   icon: sources[1],
        //   navigatorButtons: {
        //     leftButtons: [
        //       {
        //         icon: sources[2],
        //         title: "Menu",
        //         id: "sideDrawerToggle"
        //       }
        //     ]
        //   }
        // },
        {
          screen: appName + ".InventoryScreen",
          label: "Inventory",
          title: "Inventory",
          icon: sources[3],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: "orange"
      },
      appStyle: {
        tabBarSelectedButtonColor: "orange"
      },
      drawer: {
        left: {
          screen: appName + ".SideDrawer"
        }
      }
    });
  });
};

export default startTabs;
