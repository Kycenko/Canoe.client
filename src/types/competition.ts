export interface ICompetition {
	id: number
	name: string
	startDate: Date
	finishDate: Date
	place: string
	athleteId?: number
}

export type TypeCompetitionForm = Omit<ICompetition, 'id'>
