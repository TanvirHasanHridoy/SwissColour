/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import NewScreen from './src/screens/NewScreen';
import LogInScreen from './src/screens/LogInScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ConfigureStore from './src/store/ConfigureStore';
import {Provider} from 'react-redux';
import configureStore from './src/store/ConfigureStore';

const store = configureStore();

const AppDrawerNav = createDrawerNavigator(
  {
    Home: HomeScreen,
  
    Details: NewScreen,

  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    drawerType: 'slide',
  },
);

const AppNavigator = createStackNavigator(
  {
    Drawer: {
      screen: AppDrawerNav,
    },
  },
  {
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LogInScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

const AppContainer = createAppContainer(RootNavigator);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
