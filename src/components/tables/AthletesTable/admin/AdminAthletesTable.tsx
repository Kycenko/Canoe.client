import {
	useDeleteAthlete,
	useFetchAthletes
} from '@entities/Athlete/athlete.queries'
import { Card, Typography } from '@material-tailwind/react'
import { useAuth } from '@src/app/providers/AuthProvider/useAuth'
import CustomButtonComponent from '@src/components/UI/buttons/CustomButtonComponent'
import SearchInputComponent from '@src/components/UI/inputs/search/SearchInputComponent'
import { CustomSpinner } from '@src/components/UI/spinner/CustomSpinner'
import { deleteNotify } from '@src/components/UI/toasts/DeleteNotify'
import Pagination from '@src/components/pagination/Pagination'
import { LINKS } from '@src/shared/lib/constants/enums'
import useFilterSortData from '@src/shared/lib/hooks/useFilterSortData'
import { usePagination } from '@src/shared/lib/hooks/usePagination'
import { updateHistory } from '@src/shared/lib/utils/updateHistory'
import { FC } from 'react'
import { Toaster } from 'sonner'
import { AthleteHeads, athleteSortField } from '../AthleteHeads'
import AthletesDataComponent from '../AthletesDataComponent'
import AthletesHeadsComponent from '../AthletesHeadsComponent'

const AdminAthletesTable: FC = () => {
	const { user } = useAuth()
	const { data: athletes } = useFetchAthletes()
	const filterData = user?.isAdmin
		? athletes
		: athletes?.filter(item => item?.region === user?.region)
	const { page, limit, setPage, pageCount } = usePagination(filterData, 100)
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

	const handleDelete = async (id: number | string) => {
		await deleteQuery.mutateAsync({ id: id })
		refetch()
		deleteNotify()
	}

	return (
		<>
			<div className='flex justify-between mb-4'>
				<SearchInputComponent
					label={'Поиск...'}
					value={searchTerm}
					onChange={setSearchTerm}
				/>

				<CustomButtonComponent path={LINKS.ADD_ATHLETE}>
					ДОБАВИТЬ СПОРТСМЕНА
				</CustomButtonComponent>
			</div>
			<div className='flex items-center justify-between border-t border-blue-gray-50 p-4 rounded-b-lg'>
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
						onChangePage={selected => setPage(selected)}
					/>
				</div>
			</div>
			<Card className='h-full w-full overflow-scroll' placeholder={undefined}>
				<table className='w-full min-w-max table-auto text-left'>
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
								removeAthlete={handleDelete}
							/>
						)}
					</tbody>
				</table>
				<Toaster />
			</Card>
		</>
	)
}

export default AdminAthletesTable
