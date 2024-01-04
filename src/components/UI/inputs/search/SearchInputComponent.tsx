import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Input } from '@material-tailwind/react'
import { FC } from 'react'

interface SearchInputProps {
	label: string
	value: string
	onChange: (e: any) => void
}

const SearchInputComponent: FC<SearchInputProps> = ({
	label,
	value,
	onChange
}) => {
	return (
		<div className='w-full md:w-64'>
			<Input
				label={label}
				icon={<MagnifyingGlassIcon className='h-5 w-5' />}
				value={value}
				onChange={e => onChange(e.target.value)}
				crossOrigin={undefined}
			/>
		</div>
	)
}

export default SearchInputComponent
