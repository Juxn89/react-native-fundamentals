import { StyleSheet, View } from "react-native"

interface Props {
	children: React.ReactNode
}

export const Screen = ({ children }: Props) => {
	return(
		<View style={ styles.screen }>
			{children}
		</View>
	)
}

export default Screen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#f8fafc',
		paddingHorizontal: 16,
		paddingVertical: 20,
		gap: 16
	}
})