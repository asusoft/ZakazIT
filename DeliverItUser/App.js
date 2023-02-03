import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';

const App = ()=> {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App
