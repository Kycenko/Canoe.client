import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography
} from '@material-tailwind/react'

import {
	useDeleteCompetition,
	useFetchCompetitions
} from '@entities/Competition/competition.queries.ts'
import SearchInputComponent from '@src/components/UI/inputs/search/SearchInputComponent.tsx'
import { CustomSpinner } from '@src/components/UI/spinner/CustomSpinner.tsx'
import { deleteNotify } from '@src/components/UI/toasts/DeleteNotify.ts'
import Pagination from '@src/components/pagination/Pagination.tsx'
import { LINKS } from '@src/shared/lib/constants/enums.ts'
import useFilterSortData from '@src/shared/lib/hooks/useFilterSortData.ts'
import { usePagination } from '@src/shared/lib/hooks/usePagination.ts'
import { updateHistory } from '@src/shared/lib/utils/updateHistory.ts'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import { CompetitionHeads, competitionSortField } from '../CompetitionHeads.ts'
import CompetitionsDataComponent from '../CompetitionsDataComponent.tsx'
import CompetitionsHeadsComponent from '../CompetitionsHeadsComponent.tsx'

const UserCompetitionsTable: FC = memo(() => {
	const { data: competitions } = useFetchCompetitions()
	const { page, limit, setPage, pageCount } = usePagination(competitions, 10)

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

	const deleteCompetition = async (id: number | string) => {
		await deleteQuery.mutateAsync({ id: id })
		refetch()
		deleteNotify()
	}

	return (
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
							Соревнования
						</Typography>
					</div>
					<div className='flex items-center'>
						<Link to={LINKS.ADD_COMPETITION}>
							<Button
								className='flex items-center bg-blue-400 gap-3'
								size='sm'
								placeholder={undefined}
							>
								<CalendarDaysIcon className='h-4 w-4' strokeWidth={2} />
								Добавить соревнование
							</Button>
						</Link>
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
			<CardBody className='overflow-x-auto h-full px-0' placeholder={undefined}>
				<table className='w-full min-w-max table-auto text-center'>
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
								removeCompetition={deleteCompetition}
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
						onChangePage={selected => setPage(selected)}
					/>
				</div>
			</CardFooter>
			<Toaster />
		</Card>
	)
})

export default UserCompetitionsTable
