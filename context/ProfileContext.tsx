import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORE_KEY = 'profile:v1'

export type Profile = {
	name: string;
	role: string;
	avatarUri?: string
}

type ContextType = {
	loading: boolean;
	profile: Profile,
	updateProfile: (patch: Partial<Profile>) => Promise<void>
	setAvatar: (uri: string | undefined) => Promise<void>
}

const defaultProfile: Profile = {
	name: 'Juan',
	role: 'Software Engineer',
	avatarUri: undefined
}

const ProfileContext = createContext<ContextType>({
	loading: true,
	profile: defaultProfile,
	updateProfile: async() => {},
	setAvatar: async() => {}
})

export const useProfile = () => useContext<ContextType>(ProfileContext)

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [profile, setProfile] = useState<Profile>(defaultProfile)

	useEffect(() => {
		(async() => {
			try {
				const raw = await AsyncStorage.getItem(STORE_KEY)

				if(raw)
					setProfile(JSON.parse(raw))


			} catch (error) {
				console.warn(error)
			}
			finally {
				setLoading(false)
			}
		})()
	}, [])

	const persist = useCallback(async(profile: Profile) => {
		setProfile(profile)

		try {
			await AsyncStorage.setItem(STORE_KEY, JSON.stringify(profile))
		} catch (error) {
			console.log('Profile save error', error)
		}
	}, [])

	const updateProfile = useCallback(async(patch: Partial<Profile>) => {
		await persist({...profile, ...patch})
	}, [profile, persist])

	const setAvatar = useCallback(async(uri: string | undefined) => {
		await persist({...profile, avatarUri: uri})
	}, [profile, persist])

	const value = useMemo(() => ({
		loading,
		profile,
		updateProfile,
		setAvatar
	}), [loading, profile, updateProfile, setAvatar])

	return (
		<ProfileContext.Provider value={value}>
			{ children }
		</ProfileContext.Provider>
	)
}