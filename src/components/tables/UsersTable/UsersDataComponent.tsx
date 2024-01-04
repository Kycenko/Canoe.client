import { TrashIcon } from '@heroicons/react/20/solid'
import { IconButton, Typography } from '@material-tailwind/react'
import DeleteConfirmForm from '@src/components/UI/forms/DeleteConfirmForm'
import { useModal } from '@src/shared/lib/hooks/useModal'
import { format } from 'date-fns'
import { FC } from 'react'

interface UsersDataComponentProps {
	data: Array<any>
	removeUser: (id: number | string) => void
}

const UsersDataComponent: FC<UsersDataComponentProps> = ({
	data,
	removeUser
}) => {
	const { isOpen, selectedId, openModal, closeModal } = useModal()

	const handleDelete = () => {
		removeUser(selectedId)
		closeModal()
	}
	return (
		<>
			{data.length > 0 ? (
				data?.map(item => {
					return (
						<tr
							className=' items-center justify-center w-full hover:bg-gray-200'
							key={item.id}
						>
							<td className='p-2 '>
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
								<div className='flex flex-col'>
									<Typography
										placeholder=''
										variant='small'
										color='blue-gray'
										className='font-normal'
									>
										{item.login}
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
									{item.region}
								</Typography>
							</td>
							<td className='p-2'>
								<Typography
									placeholder=''
									variant='small'
									color='blue-gray'
									className='font-normal'
								>
									{item.isAdmin ? 'Да' : 'Нет'}
								</Typography>
							</td>
							<td className='p-2'>
								<Typography
									placeholder=''
									variant='small'
									color='blue-gray'
									className='font-normal'
								>
									{format(new Date(item.createdAt), 'dd.MM.yyyy')}
								</Typography>
							</td>

							<td className='p-2 flex flex-col'>
								<button className='m-2 rounded-md border border-blue-300 hover:bg-blue-400 hover:text-white'>
									Изменить логин
								</button>
								<button className='m-2 rounded-md border border-blue-300 hover:bg-blue-400 hover:text-white'>
									Изменить пароль
								</button>
							</td>
							<td className='p-2'>
								<IconButton
									placeholder=''
									variant='text'
									onClick={() => openModal(item.id)}
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
									<div>Логин: {item.login}</div>
									<div>Регион: {item.region}</div>
									<div>Администратор: {item.isAdmin ? 'Да' : 'Нет'}</div>
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

export default UsersDataComponent
