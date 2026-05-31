import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Login from './screens/Login';
import { style } from './styles';

export default function App() {
  return (
    <View style={style.container}>
	    <Login/>
	    <StatusBar style='auto'/>
    </View>
  );
}
