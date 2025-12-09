import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { Screen } from '@/components/Screen';
import { generateAvatarAI } from '@/services/avatar';
import { ThemedText } from '@/components/themed-text';
import { useProfile } from '@/context/ProfileContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function ProfileScreen() {
	const { loading, profile, setAvatar, updateProfile } = useProfile()
	const surface = useThemeColor({}, 'surface')
	const border = useThemeColor({}, 'border')
	const text = useThemeColor({}, 'text')
	const muted = useThemeColor({}, 'muted')

	const [name, setName] = useState(profile.name)
	const [role, setRole] = useState(profile.role)
	const [busy, setBusy] = useState<boolean>(false)

	useEffect(() => {
		setName(profile.name)
		setRole(profile.role)
	}, [profile.name, profile.role])

	const save = async() => {
		setBusy(true)
		await updateProfile({
			name: name.trim() || 'No name',
			role: role.trim() || 'No role'
		})
		setBusy(false)

		Alert.alert('Profile', 'Profile updated')
	}

	const pickFromGallery = async () => {
		const response = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.8
		})

		if(!response.canceled)
			await setAvatar(response.assets[0].uri)
	}

	const takePhoto = async() => {
		const permissions = await ImagePicker.requestCameraPermissionsAsync()

		if(permissions.status !== ImagePicker.PermissionStatus.GRANTED) {
			Alert.alert('Permissions', 'Allow access to the camera')
			return
		}

		const response = await ImagePicker.launchCameraAsync({ quality: 0.8 })
		if(!response.canceled)
			await setAvatar(response.assets[0].uri)
	}

	const makeAI = async () => {
		setBusy(true)
		const url = await generateAvatarAI(name || 'User')
		await setAvatar(url)
		setBusy(false)
	}

	if(loading) {
		return (
			<View style={styles.loadingScreen}>
				<ThemedText>Loading profile...</ThemedText>
			</View>
		)
	}

  return (
    <Screen>
			<KeyboardAvoidingView
				behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
				style={{ flex: 1 }}
			>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 24 }}
					keyboardShouldPersistTaps='handled'
				>
					<View style={{ alignItems: 'center', gap: 12, marginBottom: 16 }}>
						<Avatar 
							name={name}
							uri={profile.avatarUri}
							onPress={pickFromGallery}
						/>
						<ThemedText>Touch the avatar for choosing from gallery</ThemedText>
					</View>
					<View style={{ gap: 12 }}>
						<ThemedText style={{ fontWeight: '700' }} >Name</ThemedText>
						<TextInput
							value={ name }
							onChangeText={ setName }
							placeholder='Your name'
							placeholderTextColor={muted}
							style={[
								styles.input,
								{ backgroundColor: surface, borderColor: border, color: text }
							]}
							returnKeyType='next'
						/>
					</View>
					<View style={{ gap: 12 }}>
						<ThemedText style={{ fontWeight: '700' }} >Role</ThemedText>
						<TextInput
							value={ role }
							onChangeText={ setRole }
							placeholder='Your role'
							placeholderTextColor={muted}
							style={[
								styles.input,
								{ backgroundColor: surface, borderColor: border, color: text }
							]}
							returnKeyType='next'
							onSubmitEditing={save}
						/>
						<View style={{ flexDirection: 'row', gap: 8, margin: 8 }}>
							<PrimaryButton title='Take photo' onPress={takePhoto} />
							<PrimaryButton title='From gallery' onPress={pickFromGallery} />
						</View>
						<PrimaryButton 
							title='Generate with IA' 
							onPress={ makeAI}
							disabled={ busy }
						/>
						<PrimaryButton 
							title='Save'
							onPress={ save }
							disabled={ busy }
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
	loadingScreen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
		gap: 8
	},
	input: {
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10
	}
});
