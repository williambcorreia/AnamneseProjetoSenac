import { StyleSheet } from "react-native";

export const style = StyleSheet.create({

	container: {
		flex: 1,
    justifyContent:'center',
		alignItems:'center',
		backgroundColor: 'white',
		gap: 20
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
    width: 300,
    height: 150,
    justifyContent:'center',
    gap: 5,
  },

  loginBottom: {
    width: 300,
    height: 150,
		alignItems:'center',
    justifyContent:'flex-end',
    backgroundColor:'white',
		gap: 10
  },
  
	greenBorder: {
		width: '100%',
		height: 35,
		backgroundColor: 'green',
		position:'absolute',
		top: 0,
	},

	logo: {
		width: 120,
		height: 120,
	}

})
