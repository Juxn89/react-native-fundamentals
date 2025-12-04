import { useCallback, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList, ListRenderItemInfo, StyleSheet, TextInput, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { HabitCart } from '@/components/HabitCard';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { HabitGreeting } from '@/components/HabitGreeting';
import { ProfileHeader } from '@/components/ProfileHeader';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useHabits } from '@/context/HabitsContext';
import { Habit } from '@/types/habits';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// interface Habit {
//  id: number; 
//  title: string; 
//  streak: number; 
//  isCompleted: boolean; 
//  priority?: 'low' | 'medium' | 'high'
// }

// const INITIAL_HABITS: Habit[] = [
// 	{ id: 1, title: 'Drink Water', streak: 5, isCompleted: true, priority: 'high' },
// 	{ id: 2, title: 'Morning Jog', streak: 3, isCompleted: false, priority: 'medium' },
// 	{ id: 3, title: 'Read a Book', streak: 7, isCompleted: true, priority: 'low' },
// 	{ id: 4, title: 'Meditate', streak: 2, isCompleted: false, priority: 'high' },
// 	{ id: 5, title: 'Write Journal', streak: 4, isCompleted: true, priority: 'medium' },
// 	{ id: 6, title: 'Practice Guitar', streak: 6, isCompleted: false, priority: 'low' },
// 	{ id: 7, title: 'Cook Healthy Meal', streak: 8, isCompleted: true, priority: 'high' },
// 	{ id: 8, title: 'Study Spanish', streak: 1, isCompleted: false, priority: 'medium' },
// 	{ id: 9, title: 'Clean Desk', streak: 3, isCompleted: true, priority: 'low' },
// 	{ id: 10, title: 'Plan Tomorrow', streak: 5, isCompleted: false, priority: 'high' },
// ]

export default function HomeScreen() {

	const border = useThemeColor({}, 'border')
	const surface = useThemeColor({ }, 'surface')
	const primary = useThemeColor({}, 'primary')
	const onPrimary = useThemeColor({}, 'onPrimary')
	const text = useThemeColor({}, 'text')
	const muted = useThemeColor({}, 'muted')
	const danger = useThemeColor({}, 'danger')
	const insets = useSafeAreaInsets()

	const [newHabit, setNewHabit] = useState<string>('')
	const { addHabit, habits, loading, toggleHabit } = useHabits()

	const onAddHabit = useCallback(() => {
		const title = newHabit.trim()

		if(!title) return

		addHabit(newHabit)
		setNewHabit('')
	}, [newHabit, addHabit])

	const total = habits.length
	const totalCompleted = useMemo(() => habits.filter(habit => habit.isCompleted).length , [habits])

	const name = 'Juan Gómez'

	const renderItem = useCallback(({ item }: ListRenderItemInfo<Habit>) => {
		const isToday = item.lastDoneAlt 
			? new Date(item.lastDoneAlt).toDateString() === new Date().toDateString() 
			: false

		return (
			<HabitCart 
				key={item.id} 
				title={item.title} 
				streak={item.streak} 
				isCompleted={item.isCompleted}
				priority={item.priority}
				onToggle={ () => toggleHabit(item.id) }
			/>
		)
	}, [toggleHabit])

	const ItemSparator = () => <View style={{ height: 12 }}></View>
	const Empty = () => (
		<View style={{ paddingVertical: 32, alignItems: 'center', gap: '8' }}>
			<ThemedText>
				{ `You don't have any habits yet. Create your first one 👆🏽` }
			</ThemedText>
		</View>
	)

	const onClearHandler = useCallback(() => {
		(async() => {
			try {
				await AsyncStorage.clear()
				Alert.alert('Clean up', 'Your habits have been deleted')
			} catch (error) {
				Alert.alert('Error', 'Something was wrong!')
				console.warn(error)
			}
		})()
	}, [])

	if(loading) {
		return(
			<Screen>
				<ThemedText>{ `Loading your habits...` }</ThemedText>
			</Screen>
		)
	}

  return (
		<Screen>
			<ProfileHeader name={name} role="Dev" />
			<HabitGreeting name={name} />
			<View style={[ styles.row, { alignItems: 'center' } ]}>
				<TextInput 
					value={ newHabit } 
					onChangeText={ setNewHabit } 
					placeholder='New habit (ex: Do exercise)'
					onSubmitEditing={ onAddHabit }
					style={[ 
						styles.input, { 
							backgroundColor: surface,
							borderColor: border,
							color: text 
						} 
					]}
				/>
				<PrimaryButton
					onPress={ onAddHabit }
					title='Add'
					style={[ 
						styles.addButton, { backgroundColor: primary }]}
				>
				</PrimaryButton>
				<PrimaryButton
					onPress={ onClearHandler }
					title='Clear'
					style={[ 
						styles.addButton, { backgroundColor: danger }]}
				>
				</PrimaryButton>
			</View>
			<FlatList
				data={ habits }
				renderItem={ renderItem }
				ItemSeparatorComponent={ ItemSparator }
				ListEmptyComponent={ Empty }
				contentContainerStyle={{
					paddingVertical: 16,
					paddingBottom: insets.bottom + 16
				}}
				initialNumToRender={ 8 }
				windowSize={ 10 }
				showsVerticalScrollIndicator={ false }
			/>
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
