export type Priority = 'low' | 'medium' | 'high'

export interface Habit {
 id: string; 
 title: string; 
 priority?: Priority
 createdAt: string;
 lastDoneAlt: string | null;
 streak: number; 
 isCompleted: boolean; 
}