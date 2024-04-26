import { ICompetition } from '@/types/competition'

import { instance } from '@/api/api.interceptors'

export const CompetitionService = {
	async create(data: ICompetition) {
		return instance.post<ICompetition>('/competitions', data)
	},

	async getAll() {
		return instance.get<ICompetition[]>('/competitions')
	},

	async getById(id: number | string) {
		return instance.get<ICompetition>(`/competitions/${id}`)
	},

	async update(id: number | string, data: ICompetition) {
		return instance.put<ICompetition>(`/competitions/${id}`, data)
	},

	async delete(id: number | string) {
		return instance.delete<ICompetition>(`/competitions/${id}`)
	}
}
