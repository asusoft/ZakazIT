import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';

import AuthContextProvider from './src/contexts/AuthContext';
import CartContextProvider from './src/contexts/CartContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <CartContextProvider>
          <RootNavigator />
        </CartContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default App
