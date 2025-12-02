import { StyleSheet, View, Text } from "react-native"

interface Props {
	name?: string
}

export const HabitGreeting = ({ name = 'Guest' }: Props) => {
	const currentDate = new Date()
	const hour = currentDate.getHours()
	const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

	return(
		<View style={styles.container}>
			<Text style={styles.title}>
				{ `${greeting} ${name}` }
			</Text>
			<Text style={[styles.subtitle, { color: '#2563eb' }]}>
				{ `Today is ${currentDate.toLocaleDateString()} - ${ currentDate.toLocaleTimeString() }` }
			</Text>
		</View>
	)
}

export default HabitGreeting

const styles = StyleSheet.create({
	container: {
		gap: 4,
		marginBottom: 16
	},
	title: {
		fontSize: 22,
		fontWeight: '700'
	},
	subtitle: {
		fontSize: 12,
		color: '#475569'
	}
})