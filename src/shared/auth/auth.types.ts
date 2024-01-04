import { IUser } from '@entities/User/user.types.ts'

export interface IUserLogin {
	login: string
	password: string
}

export interface IUserRegister {
	login: string
	password: string
	isAdmin: boolean
	region: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
