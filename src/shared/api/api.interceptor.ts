import axios from 'axios'
import { getAccessToken, removeFromStorage } from '../auth/auth.helper'
import { AuthService } from '../auth/auth.service'
import { BASE_URL } from '../lib/constants/enums'
import { errorCatch, getContentType } from './api.helper'

export const instance = axios.create({
	baseURL: BASE_URL.BASE_URL,
	headers: getContentType()
})

instance.interceptors.request.use(async config => {
	const accessToken = await getAccessToken()
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response?.status === 401 ||
				errorCatch(error) === 'jwt expired ' ||
				errorCatch(error) === 'jwt must be provided') &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true

			try {
				await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeFromStorage()
				}
			}
		}

		throw error
	}
)

export default instance
