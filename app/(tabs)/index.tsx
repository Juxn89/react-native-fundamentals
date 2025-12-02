import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { destructuring } from '@/utils/math';

export default function HomeScreen() {
	const name = 'Juan'
	const age = 36
	const isPremiun = true
	const messages = 5
	const currentDate = new Date()
	const hour = currentDate.getHours()
	const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <View style={ styles.container }>
			<Text>Hi 👋🏽, { name }</Text>
			<Text>{ greeting }</Text>
			<Text>In ten years, { age + 10 }</Text>
			<Text> { isPremiun ? 'Premium user' : 'Free user' } </Text>
			<Text> { messages > 0 ? `You have ${messages} new messages` : 'No new messages' } </Text>
      <Text style={ styles.title }>My first app with React Native</Text>
			<Text style={ styles.subTitle }>Save and reload to see your changes.</Text>
			<Link href="/about">Go to about me</Link>
			<Text>{ destructuring() }</Text>
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
