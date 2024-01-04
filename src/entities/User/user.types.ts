export interface IUser {
	id: number
	login: string
	password: string
	isAdmin: boolean
	region: string
	createdAt: Date
	updatedAt: Date
}

export interface UserDataType {
	login: string
	password: string
}

export interface UserChangePasswordDataType {
	oldPassword: string
	newPassword: string
	confirmNewPassword: string
}
