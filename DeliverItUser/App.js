import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';


import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  }
});


const App = () => {
  return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
  );
}

export default withAuthenticator(App)
