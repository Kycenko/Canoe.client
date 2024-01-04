import { FC } from 'react'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
	currentPage: number
	pageCount: number
	onChangePage: (e: any) => void
}

const Pagination: FC<PaginationProps> = ({
	currentPage,
	onChangePage,
	pageCount
}) => {
	return (
		<ReactPaginate
			className='flex gap-2'
			breakLabel=''
			nextLabel='Далее'
			onPageChange={e => onChangePage(e.selected + 1)}
			pageRangeDisplayed={5}
			marginPagesDisplayed={2}
			forcePage={currentPage}
			pageCount={Math.max(pageCount, 0)}
			previousLabel='Назад'
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination
