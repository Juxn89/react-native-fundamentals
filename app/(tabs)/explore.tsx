import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/themed-text';
import { QuickAddChips } from '@/components/QuickAddChips';

export default function TabTwoScreen() {
	const [habitsPicked, setHabitsPicked] = useState<string[]>([])
	const onPick = (habit: string) => setHabitsPicked(prev => (prev.includes(habit)) ? prev : [habit, ...prev] )
	
  return (
		<Screen>
			<View>
				<ThemedText style={{ fontWeight: '700', fontSize: 18 }}>
					Quick suggestions
				</ThemedText>
				<QuickAddChips onPick={ onPick } />
				<ThemedText>Your choices</ThemedText>
				<FlatList
					data={habitsPicked}
					keyExtractor={ habit => habit }
					renderItem={ ({item}) => <ThemedText>{ item }</ThemedText> }
					ListEmptyComponent={ <ThemedText>Select a habit from the suggested list</ThemedText> }
				/>
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
