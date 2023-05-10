import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';

import AuthContextProvider from './src/contexts/AuthContext';
import CartContextProvider from './src/contexts/CartContext';
import OrderContextProvider from './src/contexts/OrderContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <RootNavigator />
          </OrderContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default App
