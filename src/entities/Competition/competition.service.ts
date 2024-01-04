import {
	CompetitionDataType,
	ICompetition
} from '@entities/Competition/competition.types.ts'
import instance from '@shared/api/api.interceptor.ts'
import { SERVICE_METHOD, SERVICE_URL } from '@shared/lib/constants/enums.ts'

export const CompetitionService = {
	async create(data: CompetitionDataType) {
		return instance<ICompetition>({
			url: `${SERVICE_URL.COMPETITIONS}/add`,
			method: SERVICE_METHOD.POST,
			data: data
		})
	},
	async getAll(page?: number, limit?: number) {
		return instance<ICompetition[]>({
			url: SERVICE_URL.COMPETITIONS,
			method: SERVICE_METHOD.GET,
			params: { page, limit }
		})
	},

	async getById(id: number | string) {
		return instance<ICompetition>({
			url: `${SERVICE_URL.COMPETITIONS}/${id}`,
			method: SERVICE_METHOD.GET
		})
	},

	async update(id: number | string, data: CompetitionDataType) {
		return instance<ICompetition>({
			url: `${SERVICE_URL.COMPETITIONS}/edit/${id}`,
			method: SERVICE_METHOD.PATCH,
			data: data
		})
	},

	async delete(id: number | string) {
		return instance<ICompetition>({
			url: `${SERVICE_URL.COMPETITIONS}/${id}`,
			method: SERVICE_METHOD.DELETE
		})
	}
}
