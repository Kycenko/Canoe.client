export interface IAthlete {
	id: number
	name: string
	surname: string
	secondName?: string
	birthDate: Date
	region: string
	rank: string
	type: string
	avatarUrl: string
	passportUrl: string
	certificateUrl: string
}
export type TypeAthleteForm = Omit<IAthlete, 'id'>
