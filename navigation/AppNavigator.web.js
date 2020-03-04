import RegistrationForm from '../Noga/RegistrationForm'
import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Reg: RegistrationForm,
  // routeTwo: ScreenTwo,
  // routeThree: ScreenThree,  
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
