import { StyleSheet } from "react-native"
import { ThemedView } from "./themed-view"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface Props {
	children: React.ReactNode
}

export const Screen = ({ children }: Props) => {
	const insets = useSafeAreaInsets()
	
	return(
		<ThemedView 
			style={[
				styles.screen,
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingHorizontal: 16
				}
			]} 
		>
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