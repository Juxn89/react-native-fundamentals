import { StyleSheet } from "react-native"
import { ThemedView } from "./themed-view"

interface Props {
	children: React.ReactNode
}

export const Screen = ({ children }: Props) => {
	return(
		<ThemedView style={ styles.screen } lightColor="#F8FAFC" darkColor="#0B1220">
			{children}
		</ThemedView>
	)
}

export default Screen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 20,
		gap: 16
	}
})