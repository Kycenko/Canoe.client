import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Typography } from '@material-tailwind/react'
import { FC } from 'react'

interface AthleteHeadsComponentProps {
	data: Array<any>
	sortField: string
	sortDirection: string
	handleSort: (value: any) => void
}

const AthletesHeadsComponent: FC<AthleteHeadsComponentProps> = ({
	data,
	sortField,
	sortDirection,
	handleSort
}) => {
	return (
		<tr>
			{data?.map(head => (
				<th
					key={head}
					onClick={() => {
						if (head !== 'Изменение' && head !== 'Удаление') {
							handleSort(head)
						}
					}}
					className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
				>
					<Typography
						placeholder=''
						variant='small'
						color='blue-gray'
						className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'
					>
						{head}
						{sortField === head && (
							<ChevronUpDownIcon
								className={`h-4 w-4 ${
									sortDirection === 'asc' ? 'rotate-180' : ''
								}`}
							/>
						)}
					</Typography>
				</th>
			))}
		</tr>
	)
}

export default AthletesHeadsComponent
