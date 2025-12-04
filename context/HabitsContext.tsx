import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react'

import { Habit, Priority } from '@/types/habits'
import { isSameDay, isYesterday, toISO } from '@/utils/date'

type State = { 
	loading: boolean,
	habits: Habit[]
}

type Actions =
	| { type: 'HYDRATE', payload: Habit[] }
	| { type: 'ADD', title: string, priority?: Priority }
	| { type: 'TOGGLE', id: string, today: Date }

const STORAGE_KEY = 'habits:v1'

const INITIAL_STATE: State = { loading: true, habits: [] }

const reducer = (state: State, action: Actions): State => {
	switch (action.type) {
		case 'HYDRATE':
			return { loading: false, habits: action.payload }
		case 'ADD':
			const now = new Date()
			const newHabit: Habit = {
				id: `h${Date.now()}`,
				title: action.title,
				priority: action.priority ?? 'low',
				createdAt: toISO(now),
				lastDoneAlt: null,
				streak: 0,
				isCompleted: false
			}
			return { loading: false, habits: [newHabit, ...state.habits] }
		case 'TOGGLE':
			const { id, today } = action
			const todayISO = toISO(today)
			const updated = state.habits.map(habit => {
				if(habit.id !== id) return habit

				const last = habit.lastDoneAlt ? new Date(habit.lastDoneAlt) : null
				const isDoneToday = last ? isSameDay(today, last) : false

				if(isDoneToday) {
					return {
						...habit,
						streak: Math.max(0, habit.streak - 1),
						lastDoneAlt: null
					}
				}

				let newStreak = 1
				if(last && isYesterday(today, last))
					newStreak += 1

				return { ...habit, streak: newStreak, lastDoneAlt: todayISO }
			})

			return { ...state, habits: updated}
		default:
			return { loading: false, habits: state.habits }
	}
}

type HabitsContextType = {
	loading: boolean,
	habits: Habit[],
	addHabit: (title: string, priority?: Priority) => void,
	toggleHabit: (id: string) => void,
}

const HabitContext = createContext<HabitsContextType | null>(null)

export const HabitsProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	useEffect(() => {
		(async() => {
			try {
				const raw = await AsyncStorage.getItem(STORAGE_KEY)
				if(raw) {
					const habits: Habit[] = JSON.parse(raw)
					dispatch({ type: 'HYDRATE', payload: habits })
				}
				else {
					dispatch({ type: 'HYDRATE', payload: [] })
				}
			} catch (error) {
				console.warn('Error while recovering the habit', error)
				dispatch({ type: 'HYDRATE', payload: [] })
			}
		})()
	}, [])

	const saveTimer = useRef<number | null>(null)

	useEffect(() => {
		if(state.loading) return

		if(saveTimer.current) clearTimeout(saveTimer.current)

		saveTimer.current = setTimeout(async () => {
			try {
				await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.habits) )
			} catch (error) {
				console.warn('Error while saving habits', error)
			}
		}, 250);

		return () => {
			if(saveTimer.current) clearTimeout(saveTimer.current)
		}
	}, [state, state.loading])

	const addHabit = useCallback((title: string, priority?: Priority) => {
		const clean = title.trim()
		
		if(!clean) return

		dispatch({ type: 'ADD', title: clean, priority })
	}, [])

	const toggleHabit = useCallback((id: string) => {
		dispatch({ type: 'TOGGLE', id, today: new Date() })
	}, [])

	const handlersMemo = useMemo<HabitsContextType>(() => ({
		...state,
		addHabit,
		toggleHabit
	}), [state, addHabit, toggleHabit])

	return (
		<HabitContext.Provider value={handlersMemo}>
			{ children }
		</HabitContext.Provider>
	)
}

export const useHabits = () => {
	const context = useContext(HabitContext)

	if(!context)
		throw new Error(`useHabits must be use within a HabitProvider`)

	return context
}