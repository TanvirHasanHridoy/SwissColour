import React, {Component} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import HeaderComponent from '../component/HeaderComponent';
import DefaultInputComponent from '../component/DefaultInputComponent';

class NewScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent
          title="New"
          leftIcon="menu"
          leftButton={() => this.props.navigation.toggleDrawer()}
          color="#9CC3D5FF"
        />
      </View>
    );
  }
}

export default NewScreen;
