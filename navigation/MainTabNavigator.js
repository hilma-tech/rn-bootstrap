import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../Noga/HomeScreen';
import RegistrationForm from '../Noga/RegistrationForm';
import LoginScreen from "./../Noga/LoginScreen"
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import consts from "./../src/modules/tools/client/hooks/consts.json"
import hooksFactory from "./../src/modules/tools/client/hooks/HooksFactory"
console.log("hii from APP")
let hooksRepository = hooksFactory.getRepository();
hooksRepository.addHook(consts.AUTH,consts.HOOK__AFTER_LOGIN,()=>{console.log("hii from main tab")});
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//create navigator - key is the route name and value is the component to display
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  config
);

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LoginStack.path = '';

//create navigator - key is the route name and value is the component to display
const RegisterStack = createStackNavigator(
  {
    registration: RegistrationForm,
  },
  config
);

RegisterStack.navigationOptions = {
  tabBarLabel: 'registration',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

RegisterStack.path = '';

//create navigator - key is the route name and value is the component to display
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LoginStack,
  RegisterStack,
});

tabNavigator.path = '';

export default tabNavigator;
