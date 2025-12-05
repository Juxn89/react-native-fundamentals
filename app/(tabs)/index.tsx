import { Alert } from 'react-native';
import { useCallback, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ListRenderItemInfo, StyleSheet, TextInput, View } from 'react-native';

import { Habit } from '@/types/habits';
import { Screen } from '@/components/Screen';
import { HabitCart } from '@/components/HabitCard';
import { useHabits } from '@/context/HabitsContext';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { HabitGreeting } from '@/components/HabitGreeting';
import { ProfileHeader } from '@/components/ProfileHeader';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useCelebration } from '@/context/CelebrationProvider';
import { isSameDay } from '@/utils/date';
import { getMotivation } from '@/services/motivation';

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
	const { celebrate } = useCelebration()

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
				key={ item.id } 
				title={ item.title } 
				streak={ item.streak } 
				isCompleted={ isToday }
				priority={ item.priority }
				onToggle={ () => onToggleWithCelebration(item) }
			/>
		)
	}, [])

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

	const onToggleWithCelebration = async (habit: Habit) => {
		const wasToday = habit.lastDoneAlt 
			? isSameDay(new Date(habit.lastDoneAlt), new Date()) : false

		toggleHabit(habit.id)

		if(!wasToday) {
			const message = await getMotivation('Juan', habit.title)
			celebrate(message)
		}
	}

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
