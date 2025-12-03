import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import Screen from '@/components/Screen';
import HabitCart from '@/components/HabitCard';
import HabitGreeting from '@/components/HabitGreeting';
import ProfileHeader from '@/components/ProfileHeader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '@/components/themed-text';

interface Habit {
 id: number; 
 title: string; 
 streak: number; 
 isCompleted: boolean; 
 priority?: 'low' | 'medium' | 'high'
}

const INITIAL_HABITS: Habit[] = [
	{ id: 1, title: 'Drink Water', streak: 5, isCompleted: true, priority: 'high' },
	{ id: 2, title: 'Exercise', streak: 3, isCompleted: false, priority: 'low' },
	{ id: 3, title: 'Read a Book', streak: 10, isCompleted: true, priority: 'medium' },
	{ id: 4, title: 'Meditate', streak: 2, isCompleted: false, priority: 'high' },
]

export default function HomeScreen() {

	const border = useThemeColor({}, 'border')
	const surface = useThemeColor({ }, 'surface')
	const primary = useThemeColor({}, 'primary')
	const onPrimary = useThemeColor({}, 'onPrimary')
	const text = useThemeColor({}, 'text')
	const muted = useThemeColor({}, 'muted')

	const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS)
	const [newHabit, setNewHabit] = useState<string>('')

	const toggle = useCallback((id: number) => {
		setHabits(prev => prev.map(habit => {
			if(habit.id !== id)
				return habit
			
			return {
				...habit,
				isCompleted: !habit.isCompleted,
				streak: !habit.isCompleted ? habit.streak + 1 : Math.max(0, habit.streak)
			}
		}))
	}, [])

	const addHabit = useCallback(() => {
		const title = newHabit.trim()

		if(!title)
			return

		setHabits(prev => [{ id: habits.length + 1, title, streak: 0, isCompleted: false, priority: 'low' }, ...prev])
	}, [newHabit])

	const total = habits.length
	const totalCompleted = useMemo(() => habits.filter(habit => habit.isCompleted).length , [habits])

	const name = 'Juan Gómez'
	
  return (
		<Screen>
			<ProfileHeader name={name} role="Dev" />
			<HabitGreeting name={name} />
			<View style={[ styles.row, { alignItems: 'center' } ]}>
				<TextInput 
					value={ newHabit } 
					onChangeText={ setNewHabit } 
					placeholder='New habit (ex: Do exercise)'
					style={[ 
						styles.input, { 
							backgroundColor: surface,
							borderColor: border,
							color: text 
						} 
					]}
				/>
				<Pressable
					onPress={addHabit}
					style={[ 
						styles.addButton, { backgroundColor: primary }]}
				>
					<ThemedText>Add</ThemedText>
				</Pressable>
			</View>
			<View style={{ gap: 12 }}>
				{
					habits.map( (habit) => (
						<HabitCart 
							key={habit.id} 
							title={habit.title} 
							streak={habit.streak} 
							isCompleted={habit.isCompleted}
							priority={habit.priority}
							onToggle={ () => toggle(habit.id) }
						/>
					))
				}
			</View>		
		</Screen>

  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f2f6ff',
		padding: 24,
		gap: 8
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
		color: '#0f172a'
	},
	subTitle: {
		fontSize: 14,
		color: '#334155'
	},
	row: {
		flexDirection: 'row',
		gap: 8
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10
	},
	addButton: {
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
