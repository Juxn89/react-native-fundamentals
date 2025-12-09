import { useThemeColor } from '@/hooks/use-theme-color';
import { Suggestion } from '@/services/suggest';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
	emoji?: string;
	title: string;
	subTitle?: string;
	onPress?: () => void
}

export const ExplorerCard = ({ emoji = '✨', title, subTitle, onPress }: Props) => {
	const surface = useThemeColor({}, 'surface')
	const border = useThemeColor({}, 'border')
	const text = useThemeColor({}, 'text')
	const muted = useThemeColor({}, 'muted')

	return (
		<Pressable
			onPress={onPress}
			accessibilityRole='button'
			accessibilityLabel={ title }
			style={({ pressed }) => [ 
				styles.base,
				Platform.OS === 'ios' ? styles.ios : styles.android,
				{
					backgroundColor: surface,
					borderColor: border,
					transform: [{ scale: pressed ? 0.98 : 1 }]
				}
			]}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
				<Text style={{ fontSize: 18 }} selectable={ false }>{ emoji }</Text>
				<View>
					<Text style={[styles.title, { fontSize: 18, color: text }]} selectable={ false }>{ title }</Text>
					{
						subTitle 
						? (<Text style={[styles.subtitle, { fontSize: 18, color: muted }]} selectable={ false }>{ subTitle }</Text>)
						: null 
					}					
				</View>
			</View>
		</Pressable>
	)
}

export default ExplorerCard

const styles = StyleSheet.create({
	base: {
		borderWidth: 1,
		borderRadius: 14,
		paddingHorizontal: 12,
		paddingVertical: 10,
		minWidth: 180,
		gap: 4
	},
	ios: {
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 }
	},
	android: {
		elevation: 1
	},
	title: { fontSize: 14, fontWeight: '600' },
	subtitle: { fontSize: 12 }
})
