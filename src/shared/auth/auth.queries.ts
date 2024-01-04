import { useAuth } from '@app/providers/AuthProvider/useAuth.ts'
import { UserService } from '@entities/User/user.service.ts'
import { IUser, UserChangePasswordDataType } from '@entities/User/user.types.ts'
import { AuthService } from '@shared/auth/auth.service.ts'
import {
	IAuthResponse,
	IUserLogin,
	IUserRegister
} from '@shared/auth/auth.types.ts'
import { QUERY_KEYS } from '@shared/lib/constants/enums.ts'
import { QueryClient, useMutation } from '@tanstack/react-query'

const queryClient = new QueryClient()
export const useLogin = () => {
	const { setUser } = useAuth()
	return useMutation<IAuthResponse | undefined, Error, IUserLogin>({
		mutationFn: async userData => AuthService.login(userData),
		onSuccess: data => {
			setUser(data.user)
		}
	})
}

export const useRegister = () => {
	return useMutation<IAuthResponse | undefined, Error, IUserRegister>({
		mutationFn: userData => AuthService.register(userData)
	})
}

export const useChangePassword = () => {
	return useMutation<
		IUser,
		Error,
		{ id: number | string; data: UserChangePasswordDataType }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await UserService.changePassword(id, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
		}
	})
}
