export type Suggestion = {
	id: string;
	title: string;
	subTitle?: string;
	emoji?: string;
	priority: 'low' | 'medium' | 'high'
}

const CATALOG: Record<string, Omit<Suggestion, "id">> = {
  "water-energy": {
    "title": "Drink water",
    "subTitle": "205 ml",
    "emoji": "💧",
    "priority": "low"
  },
  "walk-energy": {
    "title": "Walk for 10 minutes",
    "subTitle": "Fresh air",
    "emoji": "🍃",
    "priority": "medium"
  },
  "breathe-energy": {
    "title": "Breathe for 1 minute",
    "subTitle": "4-7-8 technique",
    "emoji": "😮‍💨",
    "priority": "low"
  },
  "reading-focus": {
    "title": "Read for 10 minutes",
    "subTitle": "Relevant topic",
    "emoji": "📚",
    "priority": "low"
  },
  "pomodoro-focus": {
    "title": "Pomodoro 25",
    "subTitle": "1 deep block",
    "emoji": "🕑",
    "priority": "medium"
  },
  "notification-focus": {
    "title": "Silence for 1 hour",
    "subTitle": "Stay focused",
    "emoji": "🔕",
    "priority": "medium"
  }
}

export type CategoryKey = 'energy' | 'focus'

export const suggestFor = async (category: CategoryKey) => {
	await new Promise((resolve) => setTimeout(resolve, 400))
	const keys = Object.keys(CATALOG).filter(key => key.endsWith(category))
	return keys.map((key, index) => ({ id: `${key}-${index}`, ...CATALOG[key] }))
}

export const suggestViaAI = async (category: CategoryKey, context: { habitsCount: number, profileName?: string }) => {
	const endpoint = process.env.EXPO_PUBLIC_AI_SUGGEST_ENDPOINT

	if(!endpoint)
		return suggestFor(category)

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Conent-Type': 'application/json' },
			body: JSON.stringify({ category, context })
		})

		if(!response.ok)
			throw new Error('AI endpoint error')

		return (await response.json()) as Suggestion[]
	} catch (error) {
		console.warn("AU fallback", error)
	}
}