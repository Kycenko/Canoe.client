import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { IAthlete } from '@/types/athlete.types'

import { AthleteService } from '@/services/athlete.service'

export function useGetAthletes() {
	return useQuery<IAthlete[]>({
		queryKey: ['athletes'],
		queryFn: async () => {
			const response: AxiosResponse<IAthlete[]> = await AthleteService.getAll()
			return response.data
		}
	})
}
