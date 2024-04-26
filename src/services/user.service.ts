import { IUser } from '@/types/user.types'

import { instance } from '@/api/api.interceptors'

export const UserService = {
	async getAll() {
		return instance.get<IUser[]>('/users')
	},

	async getById(id: number | string) {
		return instance.get<IUser>(`/users/${id}`)
	},

	async update(id: number | string, data: IUser) {
		return instance.patch<IUser>(`/users/${id}`, data)
	},

	async delete(id: number | string) {
		return instance.delete<IUser>(`/users/${id}`)
	}
}
