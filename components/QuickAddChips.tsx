import { useState } from "react"
import { Pressable, ScrollView, StyleSheet } from "react-native"

import { useThemeColor } from "@/hooks/use-theme-color"
import { ThemedText } from "./themed-text"

const SUGGESTED_HABITS: string[] = [
	'Drink water',
	'Read 10 min',
	'Walk for 15 min',
	'Breath for 15 min',
	'Stretching',
]

interface Props {
	onPick: (title: string) => void
}

export const QuickAddChips = ({ onPick }: Props) => {
	const border = useThemeColor({}, 'border')
	const surface = useThemeColor({ }, 'surface')
	const text = useThemeColor({}, 'text')

	const [suggestedHabits, setSuggestedHabits] = useState<string[]>(SUGGESTED_HABITS)
	
	return (
		<ScrollView 
			horizontal
			showsHorizontalScrollIndicator={ false }
			contentContainerStyle={{ paddingHorizontal: 4, gap: 8 }}
		>
		{
			suggestedHabits.map(habit => (
				<Pressable
					key={habit}
					onPress={ () => onPick(habit) }
					style={ ({pressed}) => [
						styles.chip, {
							backgroundColor: surface,
							borderColor: border,
							opacity: pressed ? 0.9 : 1
						}
					]}
					android_ripple={{ color: border }}
				>
					<ThemedText>{ habit }</ThemedText>
				</Pressable>
			))
		}
		</ScrollView>
	)
}

export default QuickAddChips

const styles = StyleSheet.create({
	chip: {
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderWidth: 1
	}
})