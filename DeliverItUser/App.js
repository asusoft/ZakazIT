import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>

  );
}
