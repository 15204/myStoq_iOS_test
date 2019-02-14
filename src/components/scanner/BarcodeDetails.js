import React, { Component } from "reactn";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";

class BarcodeDetails extends Component {
  componentDidMount = () => {
    this.setState({
      product: this.props.product
    });
  };

  state = {
    product: null,
    qty: null,
    comment: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Barcode Details</Text>
        <Text>{this.props.product.Barcode}</Text>
        <Text>{this.props.product.Description}</Text>
        <TextInput
          keyboardType="numeric"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={qty => this.setState({ qty })}
          value={this.props.qty.toString()}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={comment => this.setState({ comment })}
          value={this.props.comment}
        />
        <Button
          onPress={() => this.props.onCloseDetails(null)}
          title="Cancel"
        />
        <Button
          onPress={() => {
            this.props.onCloseDetails(this.state);
          }}
          title="Save"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
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

export default BarcodeDetails;
