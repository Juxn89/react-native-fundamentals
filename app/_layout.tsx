import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { HabitsProvider } from '@/context/HabitsContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CelebrationProvider } from '@/context/CelebrationProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<HabitsProvider>
				<CelebrationProvider>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
						<StatusBar style="auto" />
					</Stack>					
				</CelebrationProvider>
			</HabitsProvider>
    </ThemeProvider>
  );
}
