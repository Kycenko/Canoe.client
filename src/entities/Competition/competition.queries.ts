import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
	CompetitionDataType,
	ICompetition
} from '@entities/Competition/competition.types.ts'
import { CompetitionService } from '@entities/Competition/competition.service.ts'
import { QUERY_KEYS } from '@shared/lib/constants/enums.ts'
import { AxiosResponse } from 'axios'

const queryClient = new QueryClient()

export const useCreateCompetition = () => {
	return useMutation<ICompetition | undefined, Error, CompetitionDataType>({
		mutationFn: async data => {
			const response = await CompetitionService.create(data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPETITIONS] })
		}
	})
}

export const useFetchCompetitions = (page?: number, limit?: number) => {
	return useQuery<ICompetition[], Error>({
		queryKey: [QUERY_KEYS.COMPETITIONS, page, limit],
		queryFn: async () => {
			const response: AxiosResponse<ICompetition[]> =
				await CompetitionService.getAll(page, limit)
			return response.data
		}
	})
}

export const useFetchCompetition = (id: number | string) => {
	return useQuery<ICompetition, Error>({
		queryKey: [QUERY_KEYS.COMPETITIONS, id],
		queryFn: async () => {
			const response: AxiosResponse<ICompetition> =
				await CompetitionService.getById(id)
			return response.data
		}
	})
}

export const useUpdateCompetition = () => {
	return useMutation<
		ICompetition | undefined,
		Error,
		{ id: number | string; data: CompetitionDataType }
	>({
		mutationFn: async ({ id, data }) => {
			const response = await CompetitionService.update(id, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPETITIONS] })
		}
	})
}

export const useDeleteCompetition = () => {
	return useMutation<void, Error, { id: number | string }>({
		mutationFn: async ({ id }) => {
			await CompetitionService.delete(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPETITIONS] })
		}
	})
}
