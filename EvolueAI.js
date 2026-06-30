import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { style } from './styles';
import { useFonts, Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import Login from './screens/Login';
import HomeTabs from './screens/HomeTabs';
import { Transcricao, Config, Carregamento, Rascunho } from './screens/Home';

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
				<Stack.Screen name='Transcrição' component={Transcricao}/>
				<Stack.Screen name='Config' component={Config}/>
				<Stack.Screen name='Carregamento' component={Carregamento}/>
				<Stack.Screen name='Rascunho' component={Rascunho}/>
			</Stack.Navigator>
		</NavigationContainer>
  );
}
