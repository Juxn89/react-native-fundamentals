import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Screen from '@/components/Screen';
import HabitCart from '@/components/HabitCard';
import HabitGreeting from '@/components/HabitGreeting';
import ProfileHeader from '@/components/ProfileHeader';

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
	const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS)
	const [newHabit, setNewHabit] = useState<Habit>()

	const name = 'Juan Gómez'
	
  return (
		<Screen>
			<ProfileHeader name={name} role="Dev" />
			<HabitGreeting name={name} />
			<View style={{ gap: 12 }}>
				{
					habits.map( (habit) => (
						<HabitCart 
							key={habit.id} 
							title={habit.title} 
							streak={habit.streak} 
							isCompleted={habit.isCompleted}
							priority={habit.priority}
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
	}
});
