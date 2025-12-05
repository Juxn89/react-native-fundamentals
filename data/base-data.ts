interface Habit {
 id: number; 
 title: string; 
 streak: number; 
 isCompleted: boolean; 
 priority?: 'low' | 'medium' | 'high'
}

export const INITIAL_HABITS: Habit[] = [
	{ id: 1, title: 'Drink Water', streak: 5, isCompleted: true, priority: 'high' },
	{ id: 2, title: 'Morning Jog', streak: 3, isCompleted: false, priority: 'medium' },
	{ id: 3, title: 'Read a Book', streak: 7, isCompleted: true, priority: 'low' },
	{ id: 4, title: 'Meditate', streak: 2, isCompleted: false, priority: 'high' },
	{ id: 5, title: 'Write Journal', streak: 4, isCompleted: true, priority: 'medium' },
	{ id: 6, title: 'Practice Guitar', streak: 6, isCompleted: false, priority: 'low' },
	{ id: 7, title: 'Cook Healthy Meal', streak: 8, isCompleted: true, priority: 'high' },
	{ id: 8, title: 'Study Spanish', streak: 1, isCompleted: false, priority: 'medium' },
	{ id: 9, title: 'Clean Desk', streak: 3, isCompleted: true, priority: 'low' },
	{ id: 10, title: 'Plan Tomorrow', streak: 5, isCompleted: false, priority: 'high' },
]