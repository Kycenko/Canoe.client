import axios from 'axios'

import { getAccessToken, removeFromStorage } from '@/config/auth.config'

import { errorCatch } from './api.error'
import { AuthService } from '@/services/auth.service'

export const instance = axios.create({
	baseURL: 'http://localhost:8888',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}

		throw error
	}
)
