import { getContentType } from '@shared/api/api.helper.ts'
import instance from '@shared/api/api.interceptor.ts'
import { saveToStorage } from '@shared/auth/auth.helper.ts'
import {
	IAuthResponse,
	IUserLogin,
	IUserRegister
} from '@shared/auth/auth.types.ts'
import {
	BASE_URL,
	SERVICE_METHOD,
	SERVICE_URL,
	TOKENS
} from '@shared/lib/constants/enums.ts'
import axios from 'axios'
import Cookies from 'js-cookie'

export const AuthService = {
	async login(data: IUserLogin): Promise<IAuthResponse | undefined> {
		const response = await instance<IAuthResponse>({
			url: `${SERVICE_URL.AUTH}/login`,
			method: SERVICE_METHOD.POST,
			data
		})

		if (response.data.accessToken) {
			saveToStorage(response.data)
			return response.data
		} else {
			console.error('Access token отсутствует!')
			return undefined
		}
	},

	register: (data: IUserRegister) => {
		return instance<IAuthResponse>({
			url: `${SERVICE_URL.AUTH}/register`,
			method: SERVICE_METHOD.POST,
			data
		}).then(response => {
			// if (response.data.accessToken) saveToStorage(response.data)
			return response.data
		})
	},

	getNewTokens: async () => {
		const refreshToken = Cookies.get(TOKENS.REFRESH_TOKEN)
		const response = await axios.post<IAuthResponse>(
			BASE_URL.BASE_URL + SERVICE_URL.AUTH_ACCESS_TOKEN,
			{ refreshToken },
			{
				headers: getContentType()
			}
		)
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	}
}
