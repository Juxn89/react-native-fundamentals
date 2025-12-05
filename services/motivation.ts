const LOCAL: string[] = [
'Great progress! 👏🏽',
'Small steps, big changes 🚀',
'Your consistency pays dividends 💪🏽',
'Keep it up, today you added +1 🔥',
'You are achieving it day by day ✨'
] 

export const getMotivation = async (name?: string, habitTitle?: string) => {
	const endpoint = process.env.EXPO_PUBLIC

	if(!endpoint)
		return returnRandomMessage()
	try {
		const response = await fetch(endpoint, { 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, habitTitle })
		})

		if(!response.ok)
			throw new Error('Endpoint error')

		const data = await response.json()
		const text: string = (data?.message ?? '')
		
		return text.slice(0, 120) || LOCAL[0]
	} catch (error) {
		console.warn('Motivation fallback: ', error)
		return returnRandomMessage()
	}
}

const returnRandomMessage = (): string => LOCAL[Math.floor(Math.random() + LOCAL.length)]