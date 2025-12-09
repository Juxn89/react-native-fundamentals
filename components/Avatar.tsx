import { useThemeColor } from "@/hooks/use-theme-color"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"

interface Props {
	size?: number,
	name: string,
	uri?: string,
	onPress?: () => void
}

const initialFrom = (name: string) => {
	const parts = name.trim().split(/\s+/).slice(0,2)
	return parts.map(p => p[0]?.toUpperCase() ?? '').join('')
}

export const Avatar = ({ size = 72, name, uri, onPress }: Props) => {
	const surface = useThemeColor({}, 'surface')
	const border = useThemeColor({}, 'border')
	const text = useThemeColor({}, 'text')

	return (
		<Pressable
			onPress={ onPress }
			accessibilityRole='imagebutton'
			accessibilityLabel='Change profile image'
		>
			{
				uri 
				? (<Image
					source={{ uri }}
					style={{
						width: size,
						height: size,
						borderRadius: size / 2,
						borderWidth: 1,
						borderColor: border
					}}
				/>)
				: (<View
					style={[
						styles.fallback,
						{
							width: size,
							height: size,
							borderRadius: size / 2,
							backgroundColor: surface,
							borderColor: border
						}
					]}
				>
					<Text
						style={[
							styles.initials,
							{
								color: text,
								fontSize: size * 0.05
							}
						]}
					>
						{ initialFrom(name) || '🙂' }
					</Text>
				</View>)
			}
		</Pressable>
	)
}

export default Avatar

const styles = StyleSheet.create({
	fallback: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1
	},
	initials: {
		fontWeight: '700'
	}
})
