import {
	IUser,
	UserChangePasswordDataType,
	UserDataType
} from '@entities/User/user.types.ts'
import instance from '@shared/api/api.interceptor.ts'
import { SERVICE_METHOD, SERVICE_URL } from '@shared/lib/constants/enums.ts'

export const UserService = {
	async getAll() {
		return instance<IUser[]>({
			url: SERVICE_URL.USERS,
			method: SERVICE_METHOD.GET
		})
	},

	async getById(id: number | string) {
		return instance<IUser>({
			url: `${SERVICE_URL.USERS}/${id}`,
			method: SERVICE_METHOD.GET
		})
	},

	async update(id: number | string, data: UserDataType) {
		return instance<IUser>({
			url: `${SERVICE_URL.USERS}/${id}`,
			method: SERVICE_METHOD.PATCH,
			data: data
		})
	},
	async changePassword(id: number | string, data: UserChangePasswordDataType) {
		return instance<IUser>({
			url: `${SERVICE_URL.USERS}/${id}/change-password`,
			method: SERVICE_METHOD.PUT,
			data: data
		})
	},

	async delete(id: number | string) {
		return instance<IUser>({
			url: `${SERVICE_URL.USERS}/${id}`,
			method: SERVICE_METHOD.DELETE
		})
	}
}
