import { AthleteService } from '@entities/Athlete/athlete.service.ts'
import { AthleteDataType, IAthlete } from '@entities/Athlete/athlete.types.ts'
import { QUERY_KEYS } from '@shared/lib/constants/enums.ts'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const queryClient = new QueryClient()

export const useCreateAthlete = () => {
	return useMutation<IAthlete | undefined, Error, any>({
		mutationFn: async data => {
			const response = await AthleteService.create(data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ATHLETES] })
		}
	})
}

export const useFetchAthletes = (
	page?: number,
	limit?: number,
	region?: string,
	isAdmin?: boolean
) => {
	return useQuery<IAthlete[], Error>({
		queryKey: [QUERY_KEYS.ATHLETES, page, limit, region, isAdmin],
		queryFn: async () => {
			const response: AxiosResponse<IAthlete[]> = await AthleteService.getAll(
				page,
				limit,
				region,
				isAdmin
			)
			return response.data
		}
	})
}

// export const useFetchAthletes = (
// 	page?: number,
// 	limit?: number,
// 	region?: string,
// 	isAdmin?: boolean
// ) => {
// 	return useQuery<{ data: IAthlete[]; total: number }, Error>({
// 		queryKey: [QUERY_KEYS.ATHLETES, page, limit, region, isAdmin],
// 		queryFn: async () => {
// 			const response: AxiosResponse<{ data: IAthlete[]; total: number }> =
// 				await AthleteService.getAll(page, limit, region, isAdmin)
// 			return response.data
// 		}
// 	})
// }

export const useFetchAthleteImages = (id: number | string) => {
	return useQuery<
		{ avatar: string; passport: string; certificate: string },
		Error
	>({
		queryKey: [QUERY_KEYS.ATHLETES, id],
		queryFn: async () => {
			const response: AxiosResponse<{
				avatar: string
				passport: string
				certificate: string
			}> = await AthleteService.getAthleteImages(id)
			return response.data
		}
	})
}

export const useFetchAthlete = (id: number | string) => {
	return useQuery<IAthlete, Error>({
		queryKey: [QUERY_KEYS.ATHLETES, id],
		queryFn: async () => {
			const response: AxiosResponse<IAthlete> = await AthleteService.getById(id)
			return response.data
		}
	})
}

export const useUpdateAthlete = () => {
	return useMutation<
		IAthlete | undefined,
		Error,
		{ id: number | string; data: AthleteDataType }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await AthleteService.update(id, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ATHLETES] })
		}
	})
}

export const useDeleteAthlete = () => {
	return useMutation<void, Error, { id: number | string }>({
		mutationFn: async ({ id }) => {
			await AthleteService.delete(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ATHLETES] })
		}
	})
}
