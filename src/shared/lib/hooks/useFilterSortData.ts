import { useState } from 'react'
import { useDebounce } from './useDebounce'

const useFilterSortData = (
	initialData,
	dataField,
	defaultSortField,
	direction
) => {
	const [searchTerm, setSearchTerm] = useState<string | null>('')
	const [sortField, setSortField] = useState<string | null>(null)
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
	const [debouncedSearchTerm] = useDebounce(searchTerm, direction)

	const sortedAndFilteredData = initialData
		?.filter(
			data =>
				!debouncedSearchTerm ||
				[]
					.concat(dataField[defaultSortField])
					.some(
						field =>
							typeof field === 'string' &&
							data[field] &&
							data[field]
								.toLowerCase()
								.includes(debouncedSearchTerm.toLowerCase())
					)
		)
		.sort((a, b) => {
			const aValue = a[dataField[sortField]]
			const bValue = b[dataField[sortField]]

			if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
			if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1

			return 0
		})
	const handleSort = (field: string) => {
		if (sortField === field)
			setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
		else {
			setSortField(field)
			setSortDirection('asc')
		}
	}

	return {
		searchTerm,
		direction,
		setSearchTerm,
		sortField,
		sortDirection,
		sortedAndFilteredData,
		handleSort
	}
}

export default useFilterSortData
