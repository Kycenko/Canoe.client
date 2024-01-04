export interface ICompetition {
	id: number
	name: string
	startDate: Date
	finishDate: Date
	place: string
	athleteId?: number
}

export interface CompetitionDataType {
	name: string
	startDate: Date
	finishDate: Date
	place: string
	athleteId?: number
}
