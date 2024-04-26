import { IAthlete } from '@/types/athlete.types'

import { Routes } from '@/config/routes.config'

import { instance } from '@/api/api.interceptors'

export const AthleteService = {
	async create(data: IAthlete) {
		return instance.post<IAthlete>(`/athletes`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async getAll() {
		return instance.get<IAthlete[]>(`/athletes`)
	},

	async getById(id: number | string) {
		return instance.get<IAthlete>(`${Routes.Athletes}/${id}`)
	},

	async update(id: number | string, data: IAthlete) {
		return instance.put<IAthlete>(`${Routes.Athletes}/${id}`, data)
	},

	async delete(id: number | string) {
		return instance.delete<IAthlete>(`${Routes.Athletes}/${id}`)
	}
}
