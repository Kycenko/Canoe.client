export interface IUser {
	id: number
	login: string
	password: string
	isAdmin: boolean
	region: string
}

export type TypeUserForm = Omit<IUser, 'id'>
