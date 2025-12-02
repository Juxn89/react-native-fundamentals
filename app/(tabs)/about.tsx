import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>About me</Text>
			<Text style={ styles.subTitle }> { `Let's go for that consistency` } </Text>
    </View>
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
