import { Tooltip } from '@nextui-org/react'
import { format } from 'date-fns'

import { IAthlete } from '@/types/athlete.types'

import { DeleteIcon } from '../ui/icons/DeleteIcon'
import { EditIcon } from '../ui/icons/EditIcon'
import { EyeIcon } from '../ui/icons/EyeIcon'

export const columns = [
	{ name: 'Номер', uid: 'id' },
	{ name: 'ФИО', uid: `${'surname'} ${'name'} ${'secondName'}` },
	{ name: 'Дата рождения', uid: 'birthDate' },
	{ name: 'Регион', uid: 'region' },
	{ name: 'Спортивное звание', uid: 'rank' },
	{ name: 'Тип', uid: 'type' },
	{ name: '', uid: 'actions' }
]

export const renderCell = (athlete: IAthlete, columnKey: React.Key) => {
	const cellValue = athlete[columnKey as keyof IAthlete]

	switch (columnKey) {
		case 'id':
			return <div>{athlete.id}</div>
		case `${'surname'} ${'name'} ${'secondName'}`:
			return (
				<div>
					{athlete.surname} {athlete.name} {athlete.secondName}
					<img
						width={'40px'}
						height={'40px'}
						src={
							'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Favatar-icon-images%2Favatar-icon-images-4.jpg&f=1&nofb=1&ipt=a9169946779969e6e4832ff7182baa715e1f13ba36138970e7446a3eb558174c&ipo=images'
						}
						alt=''
					/>
				</div>
			)
		// case 'name':
		// 	return <div>{athlete.name}</div>
		// case 'secondName':
		// 	return <div>{athlete.secondName}</div>
		case 'birthDate':
			return <div>{format(new Date(athlete.birthDate), 'dd.MM.yyyy')}</div>
		case 'region':
			return <div>{athlete.region}</div>
		case 'rank':
			return <div>{athlete.rank}</div>
		case 'type':
			return <div>{athlete.type}</div>
		case 'actions':
			return (
				<div className=' relative flex justify-center items-center gap-2'>
					<Tooltip content='Подробнее'>
						<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
							<EyeIcon />
						</span>
					</Tooltip>
					<Tooltip content='Изменить'>
						<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
							<EditIcon />
						</span>
					</Tooltip>
					<Tooltip
						color='danger'
						content='Удалить'
					>
						<span className='text-lg text-danger cursor-pointer active:opacity-50'>
							<DeleteIcon />
						</span>
					</Tooltip>
				</div>
			)
		default:
			return cellValue
	}
}
