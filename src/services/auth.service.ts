import { IAuthResponse, ILogin, IRegister } from '@/types/auth.types'

import { removeFromStorage, saveTokenStorage } from '@/config/auth.config'
import { Routes } from '@/config/routes.config'

import { instance } from '@/api/api.interceptors'

;('@/api/api.interceptors')

export const AuthService = {
	async login(data: ILogin) {
		const response = await instance.post<IAuthResponse>(`auth/login`, data)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	},

	async register(data: IRegister) {
		return await instance.post<IAuthResponse>(`${Routes.Register}`, data)
	},
	async getNewTokens() {
		const response = await instance.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},
	async logout() {
		const response = await instance.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}
}
