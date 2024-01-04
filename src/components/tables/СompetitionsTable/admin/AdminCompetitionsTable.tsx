import { useFetchCompetitions } from '@entities/Competition/competition.queries'
import { Card, Typography } from '@material-tailwind/react'
import CustomButtonComponent from '@src/components/UI/buttons/CustomButtonComponent'
import SearchInputComponent from '@src/components/UI/inputs/search/SearchInputComponent'
import { CustomSpinner } from '@src/components/UI/spinner/CustomSpinner'
import { deleteNotify } from '@src/components/UI/toasts/DeleteNotify'
import Pagination from '@src/components/pagination/Pagination'
import { LINKS } from '@src/shared/lib/constants/enums'
import useFilterSortData from '@src/shared/lib/hooks/useFilterSortData'
import { usePagination } from '@src/shared/lib/hooks/usePagination'
import { updateHistory } from '@src/shared/lib/utils/updateHistory'
import { Toaster } from 'sonner'
import { CompetitionHeads, competitionSortField } from '../CompetitionHeads'
import CompetitionsDataComponent from '../CompetitionsDataComponent'
import CompetitionsHeadsComponent from '../CompetitionsHeadsComponent'
import { useDeleteCompetition } from './../../../../entities/Competition/competition.queries'

const AdminCompetitionsTable = () => {
	const { data: competitions } = useFetchCompetitions()
	const { page, limit, setPage, pageCount } = usePagination(competitions, 100)

	const {
		data: competitionsWithParams,
		refetch,
		isLoading
	} = useFetchCompetitions(page, limit)

	const {
		searchTerm,
		setSearchTerm,
		sortField,
		sortDirection,
		sortedAndFilteredData,
		handleSort
	} = useFilterSortData(
		competitionsWithParams,
		competitionSortField,
		'Название',
		500
	)

	updateHistory(searchTerm, sortField, sortDirection)

	const deleteQuery = useDeleteCompetition()

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

				<CustomButtonComponent path={LINKS.ADD_COMPETITION}>
					ДОБАВИТЬ СОРЕВНОВАНИЕ
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
						<CompetitionsHeadsComponent
							data={CompetitionHeads}
							sortField={sortField}
							sortDirection={sortDirection}
							handleSort={handleSort}
						/>
					</thead>
					<tbody>
						{isLoading ? (
							<CustomSpinner />
						) : (
							<CompetitionsDataComponent
								data={sortedAndFilteredData}
								removeCompetition={handleDelete}
							/>
						)}
					</tbody>
				</table>
			</Card>
			<Toaster />
		</>
	)
}

export default AdminCompetitionsTable
