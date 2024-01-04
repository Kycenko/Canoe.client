import { Spinner } from '@material-tailwind/react'

export function CustomSpinner() {
	return (
		<div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
			<Spinner className='h-12 w-12 text-gray-900/50' />
		</div>
	)
}
