import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched ? styles.invalid : null,
    ]}
  />
);

const styles = StyleSheet.create({
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red',
  },
  input: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default defaultInput;
