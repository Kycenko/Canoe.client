import { QUERY_KEYS } from '@shared/lib/constants/enums.ts'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { IUser, UserDataType } from '@entities/User/user.types.ts'
import { AxiosResponse } from 'axios'
import { UserService } from '@entities/User/user.service.ts'


const queryClient = new QueryClient();
export const useFetchUsers = () => {
	return useQuery<IUser[], Error>({
		queryKey: [QUERY_KEYS.USERS],
		queryFn: async () => {
			const response: AxiosResponse<IUser[]> = await UserService.getAll();
			return response.data;
		},
	});
};

export const useFetchUser = (id: number | string) => {
	return useQuery<IUser, Error>({
		queryKey: [QUERY_KEYS.USERS, id],
		queryFn: async () => {
			const response: AxiosResponse<IUser> = await UserService.getById(id);
			return response.data;
		},
	});
};

// export const useFetchProfile = (id: number | string) => {
// 	return useQuery<IUser, Error>({
// 		queryKey: [QUERY_KEYS.USERS, id],
// 		queryFn: async () => {
// 			const response: AxiosResponse<IUser> = await UserService.getProfile(id)
// 			return response.data
// 		}
// 	})
// }

export const useUpdateUser = () => {
	return useMutation<
		IUser | undefined,
		Error,
		{ id: number | string; data: UserDataType }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await UserService.update(id, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
		},
	});
};

export const useDeleteUser = () => {
	return useMutation<void, Error, { id: number | string }>({
		mutationFn: async ({ id }) => {
			await UserService.delete(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
		},
	});
};
