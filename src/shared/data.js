import firebase from "../../Firebase";
import * as util from "../shared/utility";

const db = firebase.firestore();

export const initProducts = async () => {
  let products = [
    {
      ProductId: 1244,
      Description: "StockMe01",
      BarCode: "(01)12345678901244(10)190601(17)220630(21)987654321",
      key: "1244"
    },
    {
      ProductId: 1255,
      Description: "StockMe02",
      BarCode: "(01)12345678901255(10)190601(17)240630(21)987654321",
      key: "1255"
    },
    {
      ProductId: 1266,
      Description: "StockMe03",
      BarCode: "(01)12345678901266(10)170601(17)180630(21)987654321",
      key: "1266"
    },
    {
      ProductId: 1277,
      Description: "StockMe04ZZZ",
      BarCode: "(01)12345678901277(10)180601(17)191230(21)987654321",
      key: "1277"
    }
  ];

  let batch = db.batch();
  let collection = db.collection("Product");

  products.map(prod => {
    let ref = collection.doc(prod.ProductId.toString());
    batch.set(ref, prod);
  });

  return new Promise((resolve, reject) => {
    batch
      .commit()
      .then(() => {
        console.log("returning products now...");
        resolve(products);
      })
      .catch(err => {
        console.log(err);
        reject(err);
        alert("Something went wrong adding products, please try again!");
      });
  });
};

initProducts_RealtimeDatabase = () => {
  let url = "https://" + projectId + ".firebaseio.com/Product.json";
  let data = JSON.stringify(products);

  console.log("Initialising products...");

  fetch(url, {
    method: "POST",
    body: data
  })
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
      alert(
        "Something went wrong initialising products data, please try again!"
      );
    });
};

createGuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const uploadInventory = async data => {
  let batch = db.batch();
  let collection = db.collection("Inventory");

  let batchId = createGuid();

  data.map(inv => {
    let data = {
      BatchId: batchId,
      UserId: "mike@abc.com",
      DateCreated: new Date(),
      ...inv
    };
    let ref = collection.doc(); //let FB generate a Auto-Id
    batch.set(ref, data);
  });

  return new Promise((resolve, reject) => {
    batch
      .commit()
      .then(() => {
        console.log("returning inventory now...");
        resolve(data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
        alert("Something went wrong adding inventory, please try again!");
      });
  });
};
