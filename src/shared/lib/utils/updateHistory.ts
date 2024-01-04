export function updateHistory(searchTerm, sortField, sortDirection) {
	window.history.pushState(
		null,
		'',
		`?&search=${searchTerm}&sort=${sortField}&order=${sortDirection}`
	)
}
