import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { style } from './styles';
import { useFonts, Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import Login from './screens/Login';
import HomeTabs from './screens/HomeTabs';

export default function App() {

		const Stack = createNativeStackNavigator()

		const [fontsLoaded] = useFonts({
			Inter_400Regular,
			Inter_500Medium,
		})

		if (!fontsLoaded) {
			return null
		}

  return (
		<NavigationContainer>
	    <StatusBar style='auto'/>
			<Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false}}>
				<Stack.Screen name='Login' component={Login}/>
				<Stack.Screen name='HomeTabs' component={HomeTabs}/>
			</Stack.Navigator>
		</NavigationContainer>
  );
}
