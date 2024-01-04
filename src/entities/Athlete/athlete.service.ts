import { AthleteDataType, IAthlete } from '@entities/Athlete/athlete.types.ts'
import instance from '@shared/api/api.interceptor.ts'
import { SERVICE_METHOD, SERVICE_URL } from '@shared/lib/constants/enums.ts'

export const AthleteService = {
	async create(data: AthleteDataType) {
		return instance<IAthlete>({
			url: `${SERVICE_URL.ATHLETES}/add`,
			method: SERVICE_METHOD.POST,
			data: data,
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	},

	async getAll(
		page?: number,
		limit?: number,
		region?: string,
		isAdmin?: boolean
	) {
		return instance<IAthlete[]>({
			url: SERVICE_URL.ATHLETES,
			method: SERVICE_METHOD.GET,
			params: { page, limit, region, isAdmin }
		})
	},
	// async getAll(
	// 	page?: number,
	// 	limit?: number,
	// 	region?: string,
	// 	isAdmin?: boolean
	// ) {
	// 	const response = await instance({
	// 		url: SERVICE_URL.ATHLETES,
	// 		method: SERVICE_METHOD.GET,
	// 		params: { page, limit, region, isAdmin }
	// 	})

	// 	return response.data
	// },

	async getAthleteImages(id: number | string) {
		return instance<{ avatar: string; passport: string; certificate: string }>({
			url: `${SERVICE_URL.ATHLETES}/${id}/images`,
			method: SERVICE_METHOD.GET
		})
	},

	async getById(id: number | string) {
		return instance<IAthlete>({
			url: `${SERVICE_URL.ATHLETES}/${id}`,
			method: SERVICE_METHOD.GET
		})
	},

	async update(id: number | string, data: AthleteDataType) {
		return instance<IAthlete>({
			url: `${SERVICE_URL.ATHLETES}/edit/${id}`,
			method: SERVICE_METHOD.PATCH,
			data: data,
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	},

	async delete(id: number | string) {
		return instance<IAthlete>({
			url: `${SERVICE_URL.ATHLETES}/${id}`,
			method: SERVICE_METHOD.DELETE
		})
	}
}
