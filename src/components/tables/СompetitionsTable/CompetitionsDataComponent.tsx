import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { IconButton, Typography } from '@material-tailwind/react'
import DeleteConfirmForm from '@src/components/UI/forms/DeleteConfirmForm'
import { LINKS } from '@src/shared/lib/constants/enums'
import { useModal } from '@src/shared/lib/hooks/useModal'
import { format } from 'date-fns'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface CompetitionsDataComponentProps {
	data: Array<any>
	removeCompetition: (id: number | string) => void
}

const CompetitionsDataComponent: FC<CompetitionsDataComponentProps> = ({
	data,
	removeCompetition
}) => {
	const { isOpen, selectedId, openModal, closeModal } = useModal()

	const handleDelete = () => {
		removeCompetition(selectedId)
		closeModal()
	}

	return (
		<>
			{data.length > 0 ? (
				data?.map(item => {
					return (
						<tr
							className='items-center justify-center w-full hover:bg-gray-200'
							key={item.id}
						>
							<td className='p-2'>
								<div className='gap-3'>
									<div className='items-center justify-center flex-col'>
										<Typography
											placeholder=''
											variant='small'
											color='blue-gray'
											className='font-normal items-center justify-center'
										>
											№{item.id}
										</Typography>
									</div>
								</div>
							</td>
							<td className='p-2'>
								<div className='gap-3'>
									<div className='items-center justify-center flex-col'>
										<Typography
											placeholder=''
											variant='small'
											color='blue-gray'
											className='font-normal items-center justify-center'
										>
											{item.name}
										</Typography>
									</div>
								</div>
							</td>
							<td className='p-2'>
								<div className='flex flex-col'>
									<Typography
										placeholder=''
										variant='small'
										color='blue-gray'
										className='font-normal'
									>
										{format(new Date(item.startDate), 'dd.MM.yyyy HH:mm')}
									</Typography>
								</div>
							</td>
							<td className='p-2'>
								<Typography
									placeholder=''
									variant='small'
									color='blue-gray'
									className='font-normal'
								>
									{format(new Date(item.finishDate), 'dd.MM.yyyy HH:mm')}
								</Typography>
							</td>
							<td className='p-2'>
								<Typography
									placeholder=''
									variant='small'
									color='blue-gray'
									className='font-normal'
								>
									{item.place}
								</Typography>
							</td>
							<td className='p-2'>
								<Link to={`${LINKS.EDIT_COMPETITION}${item.id}`}>
									<IconButton placeholder='' variant='text'>
										<PencilIcon className='h-4 w-4' />
									</IconButton>
								</Link>
							</td>
							<td className='p-2'>
								<IconButton
									onClick={() => openModal(item.id)}
									placeholder=''
									variant='text'
								>
									<TrashIcon className='h-4 w-4' />
								</IconButton>
							</td>
							<DeleteConfirmForm
								Open={isOpen && selectedId === item.id}
								onClose={closeModal}
								onSubmit={handleDelete}
								formTitle={'Удаление соревнования'}
							>
								<div className='flex flex-col'>
									<div>Название: {item.name}</div>
									<div>
										Дата начала:{' '}
										{format(new Date(item.startDate), 'dd:MM:yyyy')}
									</div>
									<div>
										Дата окончания:{' '}
										{format(new Date(item.finishDate), 'dd:MM:yyyy')}
									</div>
									<div>Место проведения: {item.place}</div>
								</div>
							</DeleteConfirmForm>
						</tr>
					)
				})
			) : (
				<div>Ничего не найдено</div>
			)}
		</>
	)
}

export default CompetitionsDataComponent
