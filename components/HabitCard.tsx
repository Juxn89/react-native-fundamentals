import { StyleSheet, Text, View } from "react-native"
import { ThemedText } from "./themed-text";

interface Props {
	title: string,
	streak: number,
	isCompleted: boolean,
	priority?: 'low' | 'medium' | 'high'
}

const priorityColors = {
	low: { backgroundColor: '#ecfccb', color: '#3f6212', padding: 2, borderRadius: 4 },
	medium: { backgroundColor: '#fef9c3', color: '#92400e', padding: 2, borderRadius: 4 },
	high: { backgroundColor: '#ffe4e6', color: '#9f1239', padding: 2, borderRadius: 4 },
}

export const HabitCart = ({ title, streak, isCompleted = false, priority = 'low' }: Props) => {
	const priorityStyle = priorityColors[priority];
	return(
		<View
			style={[ styles.card, isCompleted && styles.completed ]}
		>
			<View style={styles.row}>
				<ThemedText style={styles.title}>
					{ title }
				</ThemedText>
				<ThemedText style={[ styles.badge, { ...priorityStyle } ]}>
					{priority}
				</ThemedText>
			</View>
			<View style={styles.row}>
			{ isCompleted && <ThemedText style={styles.badge}>✓ Today</ThemedText> }
				<ThemedText style={styles.streak}>{ `🔥 ${streak} days streak.` }</ThemedText>
			</View>
		</View>
	)
}

export default HabitCart

const styles = StyleSheet.create({
	card: { 
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		gap: 6,
		shadowColor: '#000',
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2
	},
  completed: {
		borderWidth: 1, 
		borderColor: '#22c55e',
	},
  row: { 
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center',
		gap: 12
	},
  title: {
		fontSize: 16,
		color: '#0f172a', 
		fontWeight: '600' 
	},
  badge: { 
		fontSize: 12,
		color: '#16a34a' 
	},
  streak: {
		fontSize: 12,
		color: '#475569'
	},
})