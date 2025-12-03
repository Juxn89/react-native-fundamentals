import { useThemeColor } from "@/hooks/use-theme-color"
import { Pressable, StyleSheet, ViewStyle } from "react-native"
import { ThemedText } from "./themed-text"

interface Props {
	title: string,
	onPress: () => void,
	disabled?: boolean,
	style?: ViewStyle | ViewStyle[]
}

export const PrimaryButton = ({ title, onPress, disabled, style }: Props) => {
	const backgroundColor = useThemeColor({}, 'primary')
	const onBackground = useThemeColor({}, 'onPrimary')
	const borderColor = useThemeColor({}, 'border')

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={ title }
			disabled={ disabled }
			onPress={ onPress }
			// onPress={ () => console.log('onPress: action fired') }
			onPressIn={ () => console.log('onPressIn: action fired') }
			onPressOut={ () => console.log('onPressOut: action fired') }
			style={({pressed}) => [
				styles.base,
				{ backgroundColor, opacity: disabled ? 0.6 : pressed ? 0.9 : 1 },
				{ borderColor },
				style as any,
				pressed && { transform: [{ scale: 0.98 }], elevation: 2 }
			]}
		>
			<ThemedText>
				{ title }
			</ThemedText>
		</Pressable>
	)
}

export default PrimaryButton

const styles = StyleSheet.create({
	base: {
		minHeight: 44,
		minWidth: 44,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
	},
	label: {
		fontWeight: '700'
	}
})