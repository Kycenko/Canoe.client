import { useEffect, useState } from 'react'

export const usePagination = (data?: Array<any>, limit?: number) => {
	const [page, setPage] = useState<number>(1)

	const dataLimit = limit

	let pageCount = 1

	if (data && Array.isArray(data)) {
		pageCount = Math.ceil(data.length / dataLimit)
	}

	useEffect(() => {
		if (pageCount > 0) {
			if (page < 1) {
				setPage(1)
			} else if (page > pageCount) {
				setPage(pageCount)
			}
		}
	}, [page, pageCount])

	return { page, limit, setPage, pageCount }
}
