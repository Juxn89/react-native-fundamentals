import { View, StyleSheet, FlatList } from 'react-native';

import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/themed-text';
import { QuickAddChips } from '@/components/QuickAddChips';
import { useHabits } from '@/context/HabitsContext';

export default function TabTwoScreen() {
	const { addHabit } = useHabits()
	const onPick = (habit: string) => addHabit(habit, 'low')
	
  return (
		<Screen>
			<View>
				<ThemedText style={{ fontWeight: '700', fontSize: 18 }}>
					Quick suggestions
				</ThemedText>
				<QuickAddChips onPick={ onPick } />
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
