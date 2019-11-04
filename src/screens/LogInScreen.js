import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {Fonts} from '../utilits/Fonts';
import userModel from '../models/userModel';
import {Button} from 'react-native-elements';
import DefaultInputComponent from '../component/DefaultInputComponent';
import validate from '../utilits/validation';
import {connect} from 'react-redux';
import {tryAuth,authAutoSingIn} from '../store/actions/index';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        userName: {
          value: '',
          valid: false,
          validationRules: {
            isUserName: true,
          },
          touched: false,
        },
        password: {
          value: '',
          valid: false,
          validationRules: {
            minLength: 4,
          },
          touched: false,
        },
      },
    };
  }
  componentDidMount() {
    const navigation = this.props.navigation.navigate('App');
    this.props.onAutoSignIn(navigation);
  }

  componentWillUnmount() {}

  onLoginPress() {
    const user = new userModel(
      this.state.controls.userName.value,
      this.state.controls.password.value,
    );
    
    const navigation = this.props.navigation.navigate('App');
    
    this.props.authSingIn(user, navigation);
  }

  updateInputState = (key, value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules),
            touched: true,
          },
        },
      };
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>SwissColor</Text>
            <DefaultInputComponent
              placeholder="User Name"
              style={styles.loginFormTextInput}
              value={this.state.controls.userName.value}
              valid={this.state.controls.userName.valid}
              onChangeText={val => this.updateInputState('userName', val)}
              touched={this.state.controls.userName.touched}
            />
            <DefaultInputComponent
              placeholder="Password"
              style={styles.loginFormTextInput}
              value={this.state.controls.password.value}
              onChangeText={val => this.updateInputState('password', val)}
              valid={this.state.controls.password.valid}
              touched={this.state.controls.password.touched}
              secureTextEntry
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
              disabled={
                !this.state.controls.userName.valid ||
                !this.state.controls.password.valid
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    //backgroundColor: '#97BC62FF',
    backgroundColor: '#9CC3D5FF',
  },
  loginFormView: {
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 60,
    fontWeight: '800',
    // marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
    //fontFamily: Fonts.OleoScript,
    color: '#345995',
  },

  loginFormTextInput: {
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
  },
  loginButton: {
    backgroundColor: '#345995',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});


const mapDispatchToProps = dispatch => {
  return {
    authSingIn: (authData, nav) => dispatch(tryAuth(authData, nav)),
    onAutoSignIn: nav => dispatch(authAutoSingIn(nav))
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(LogInScreen);
