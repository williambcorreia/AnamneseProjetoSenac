import { StyleSheet } from "react-native";

export const style = StyleSheet.create({

	container: {
		flex: 1,
    justifyContent:'center',
		alignItems:'center',
		backgroundColor: 'white',
		gap: 10
	},

  loginTop: {
    width: 300,
    height: 170,
		alignItems:'center',
    justifyContent:'center',
    gap: 20,
    marginBottom: 50
  },

  loginMid: {
    width: 315,
    height: 150,
    justifyContent:'center',
    gap: 5,
		marginBottom: 70
  },

  loginBottom: {
    width: 300,
    height: 150,
		alignItems:'center',
    justifyContent:'flex-end',
		gap: 20
  },

	draftContainer: {
		alignItems: 'center', 
		width: 330, 
		gap: 30, 
		marginBottom: 50, 
		height: 550, 
	},
  
	greenBorder: {
		width: '100%',
		height: 35,
		backgroundColor: 'mediumseagreen',
		position:'absolute',
		top: 0,
	},

	logo: {
		width: 120,
		height: 120,
	},

	f16r: {
		fontSize: 16,
		fontFamily: 'Inter_400Regular'
	},

	f22m: {
		fontSize: 22,
		fontFamily: 'Inter_500Medium'
	},

	legenda: {
		fontFamily: 'Inter_500Medium',
		position: 'absolute',
		top: 440,
		width: '90%',
		maxHeight: 350,
		alignSelf: 'center',
	},

})
