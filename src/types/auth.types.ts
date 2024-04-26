import { IUser } from './user.types'

export interface ILogin {
	login: string
	password: string
}
export interface IRegister {
	login: string
	password: string
	isAdmin: boolean
	region: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
