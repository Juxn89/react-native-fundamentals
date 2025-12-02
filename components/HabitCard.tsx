import { StyleSheet, Text, View } from "react-native"

interface Props {
	title: string,
	streak: number,
	isCompleted: boolean,
	priority?: 'low' | 'medium' | 'high'
}

const priorityColors = {
	low: { backgroundColor: '#ecfccb', color: '#3f6212' },
	medium: { backgroundColor: '#fef9c3', color: '#92400e' },
	high: { backgroundColor: '#ffe4e6', color: '#9f1239' },
}

export const HabitCart = ({ title, streak, isCompleted = false, priority = 'low' }: Props) => {
	const priorityStyle = priorityColors[priority];
	return(
		<View
			style={[ styles.card, isCompleted && styles.completed ]}
		>
			<View style={styles.row}>
				<Text style={styles.title}>
					{ title }
				</Text>
				<Text style={[ styles.badge, { backgroundColor: priorityStyle.backgroundColor, color: priorityStyle.color } ]}>
					{priority}
				</Text>
			</View>
			<View style={styles.row}>
			{ isCompleted && <Text style={styles.badge}>✓ Today</Text> }
				<Text style={styles.streak}>🔥 {streak} days streak</Text>
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
		alignItems: 'center' 
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