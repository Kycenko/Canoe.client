import {
	useDeleteAthlete,
	useFetchAthletes
} from '@entities/Athlete/athlete.queries.ts'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography
} from '@material-tailwind/react'
import useFilterSortData from '@shared/lib/hooks/useFilterSortData.ts'
import { useAuth } from '@src/app/providers/AuthProvider/useAuth.ts'
import CustomButtonComponent from '@src/components/UI/buttons/CustomButtonComponent.tsx'
import SearchInputComponent from '@src/components/UI/inputs/search/SearchInputComponent.tsx'
import { CustomSpinner } from '@src/components/UI/spinner/CustomSpinner.tsx'
import { deleteNotify } from '@src/components/UI/toasts/DeleteNotify.ts'
import { LINKS } from '@src/shared/lib/constants/enums.ts'
import { usePagination } from '@src/shared/lib/hooks/usePagination.ts'
import { updateHistory } from '@src/shared/lib/utils/updateHistory.ts'
import { FC, memo } from 'react'
import { Toaster } from 'sonner'
import Pagination from '../../../pagination/Pagination.tsx'
import { AthleteHeads, athleteSortField } from '../AthleteHeads.ts'
import AthletesDataComponent from '../AthletesDataComponent.tsx'
import AthletesHeadsComponent from '../AthletesHeadsComponent.tsx'

const UserAthletesTable: FC = memo(() => {
	const { user } = useAuth()
	const { data: athletes } = useFetchAthletes()
	const filterData = user?.isAdmin
		? athletes
		: athletes?.filter(item => item?.region === user?.region)
	const { page, limit, setPage, pageCount } = usePagination(filterData, 10)
	const {
		data: athletesWithParams,
		refetch,
		isLoading
	} = useFetchAthletes(page, limit, user?.region, user?.isAdmin)

	const {
		searchTerm,
		setSearchTerm,
		sortField,
		sortDirection,
		sortedAndFilteredData,
		handleSort
	} = useFilterSortData(athletesWithParams, athleteSortField, 'ФИО', 500)

	updateHistory(searchTerm, sortField, sortDirection)

	const deleteQuery = useDeleteAthlete()

	const deleteAthlete = async (id: number | string) => {
		await deleteQuery.mutateAsync({ id: id })
		refetch()
		deleteNotify()
	}

	return (
		<>
			<Card className='h-full w-full border rounded-lg' placeholder={undefined}>
				<CardHeader
					className='text-white rounded-t-lg p-3'
					floated={false}
					shadow={false}
					placeholder={undefined}
				>
					<div className='flex items-center justify-between'>
						<div>
							<Typography variant='h5' color='black' placeholder={undefined}>
								Спортсмены
							</Typography>
						</div>
						<div className='flex items-center'>
							<CustomButtonComponent path={LINKS.ADD_ATHLETE}>
								<UserPlusIcon className='h-4 w-4' strokeWidth={2} />
								Добавить спортсмена
							</CustomButtonComponent>
						</div>
					</div>
					<div className='flex items-center justify-between mb-20 md:flex-row'>
						<SearchInputComponent
							label={'Поиск...'}
							value={searchTerm}
							onChange={setSearchTerm}
						/>
					</div>
				</CardHeader>
				<CardBody
					className='overflow-x-auto h-full px-0'
					placeholder={undefined}
				>
					<table className='w-full min-w-max table-auto text-center'>
						<thead>
							<AthletesHeadsComponent
								data={AthleteHeads}
								sortField={sortField}
								sortDirection={sortDirection}
								handleSort={handleSort}
							/>
						</thead>
						<tbody>
							{isLoading ? (
								<CustomSpinner />
							) : (
								<AthletesDataComponent
									data={sortedAndFilteredData}
									removeAthlete={deleteAthlete}
								/>
							)}
						</tbody>
					</table>
				</CardBody>
				<CardFooter
					className='flex items-center justify-between border-t border-blue-gray-50 p-4 rounded-b-lg'
					placeholder={undefined}
				>
					<Typography
						variant='small'
						color='blue-gray'
						className='font-normal'
						placeholder={undefined}
					>
						Страница {page} из {pageCount}
					</Typography>
					<div className='flex gap-2'>
						<Pagination
							pageCount={pageCount}
							currentPage={page - 1}
							onChangePage={selected =>
								setPage(prevPage =>
									prevPage !== selected ? selected : prevPage
								)
							}
						/>
					</div>
				</CardFooter>
				<Toaster />
			</Card>
		</>
	)
})

export default UserAthletesTable
