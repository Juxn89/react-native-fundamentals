import { Alert, FlatList, StyleSheet, View } from 'react-native';

import ExplorerCard from '@/components/ExplorerCard';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/themed-text';
import { useHabits } from '@/context/HabitsContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { suggestFor, Suggestion } from '@/services/suggest';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
	const { addHabit } = useHabits()
	const text = useThemeColor({}, 'text')
	const muted = useThemeColor({}, 'muted')

	const [energy, setEnergy] = useState<Suggestion[] | null>(null)
	const [focus, setFocus] = useState<Suggestion[] | null>(null)

	useEffect(() => {
		let mounted = false;

		(async() => {
			try {
				const [energyResult, focusResult] = await Promise.all([					
					suggestFor('energy'),
					suggestFor('focus'),
				])

				if(!mounted) return

				setEnergy(energyResult)
				setFocus(focusResult)

			} catch (error) {
				console.warn(error)
			}
		})()

		return () => { mounted = false }
	}, [])

	const onPick = (suggestion: Suggestion) => { 
		addHabit(suggestion.title, suggestion.priority)
		Alert.alert('Added', `Habit created: ${suggestion.title}`)
	}

	const renderItem = ({item}: { item: Suggestion }) => (
		<ExplorerCard 
			title={item.title} 
			subTitle={item.subTitle} 
			emoji={ item.emoji } 
			onPress={ () => onPick(item) } 
		/>
	)

	const keyExtractor = (item: Suggestion) => item.id

	const Section = ({title, data}: { title: string, data: Suggestion[] | null }) => (
		<View style={{ gap: 8 }}>
			<ThemedText style={{ fontWeight: '700', fontSize: 18, color: text }}>
				{ title }
			</ThemedText>
			{
				data 
				? (
					<FlatList
						data={ data }
						keyExtractor={keyExtractor}
						renderItem={renderItem}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ gap: 8, paddingRight: 8 }}
					/>
				) 
				: (
					<View style={{ flexDirection: 'row', gap: 8 }}>
						<ExplorerCard title='Loading...' subTitle='..' />
						<ExplorerCard title='Loading...' subTitle='..' />
						<ExplorerCard title='Loading...' subTitle='..' />
					</View>
				)
			}
		</View>
	)
	
  return (
		<Screen>
			<View>
				<ThemedText style={{ fontWeight: '700', fontSize: 18 }}>
					Quick suggestions
				</ThemedText>
				<Section title='Energy' data={energy} />
				<Section title='Focus' data={focus} />
			</View>
		</Screen>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
