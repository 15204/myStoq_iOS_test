import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput
    underlineAndroid="transparent"
    {...props} //spread to distribute any other properties we dont explicitly define above
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched ? styles.invlaid : null
    ]} //allows to apply default plus custom styling
  />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    marginTop: 8,
    marginBottom: 8
  },
  invlaid: {
    backgroundColor: "#f9c0c0",
    borderColor: "red"
  }
});

export default defaultInput;
