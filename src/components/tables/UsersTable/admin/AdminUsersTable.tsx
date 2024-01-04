import { useDeleteUser, useFetchUsers } from '@entities/User/user.queries'
import { Card, Option } from '@material-tailwind/react'
import { useAuth } from '@src/app/providers/AuthProvider/useAuth'
import CustomButtonComponent from '@src/components/UI/buttons/CustomButtonComponent'
import ModalForm from '@src/components/UI/forms/ModalForm'
import InputComponent from '@src/components/UI/inputs/InputComponent'
import SearchInputComponent from '@src/components/UI/inputs/search/SearchInputComponent'
import SelectComponent from '@src/components/UI/selects/SelectComponent'
import { CustomSpinner } from '@src/components/UI/spinner/CustomSpinner'
import { createNotify } from '@src/components/UI/toasts/CreateNotify'
import { deleteNotify } from '@src/components/UI/toasts/DeleteNotify'
import { useRegister } from '@src/shared/auth/auth.queries'
import { IUserRegister } from '@src/shared/auth/auth.types'
import useFilterSortData from '@src/shared/lib/hooks/useFilterSortData'
import { updateHistory } from '@src/shared/lib/utils/updateHistory'
import { FC, memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster } from 'sonner'
import { UserHeads, userSortField } from '../UserHeads'
import UsersDataComponent from '../UsersDataComponent'
import UsersHeadsComponent from '../UsersHeadsComponent'

const AdminUsersTable: FC = memo(() => {
	const methods = useForm()
	const { watch, setValue } = methods
	const [open, setOpen] = useState<boolean>(false)
	const { data: users, refetch, isLoading } = useFetchUsers()
	const { user } = useAuth()
	const createQuery = useRegister()

	const handleRegister = async (data: IUserRegister) => {
		await createQuery.mutateAsync({
			...data,
			isAdmin: watch('isAdmin') === 'true',
			region: watch('region')
		})
		setOpen(false)
		refetch()
		createNotify()
	}
	const deleteQuery = useDeleteUser()
	const handleDelete = async (id: number | string) => {
		await deleteQuery.mutateAsync({ id: id })
		refetch()
		deleteNotify()
	}

	const {
		searchTerm,
		setSearchTerm,
		sortField,
		sortDirection,
		sortedAndFilteredData,
		handleSort
	} = useFilterSortData(users, userSortField, 'Логин', 500)

	updateHistory(searchTerm, sortField, sortDirection)

	return (
		<>
			<div className='flex justify-between mb-4'>
				<SearchInputComponent
					label={'Поиск...'}
					value={searchTerm}
					onChange={setSearchTerm}
				/>
				<div className='flex justify-center items-center'>
					Текущий пользователь: {user?.login}
				</div>

				<CustomButtonComponent onClick={() => setOpen(true)}>
					СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ
				</CustomButtonComponent>
			</div>

			<Card className='h-full w-full overflow-y-auto' placeholder={undefined}>
				<table className='w-full min-w-max table-auto text-left'>
					<thead>
						<UsersHeadsComponent
							data={UserHeads}
							sortField={sortField}
							sortDirection={sortDirection}
							handleSort={handleSort}
						/>
					</thead>
					<tbody>
						{isLoading ? (
							<CustomSpinner />
						) : (
							<UsersDataComponent
								data={sortedAndFilteredData}
								removeUser={handleDelete}
							/>
						)}
					</tbody>
				</table>
			</Card>
			<ModalForm
				isOpen={open}
				onClose={() => setOpen(false)}
				onSubmit={handleRegister}
				formTitle={'Создание пользователя'}
				buttonTitle={'Создать'}
			>
				<InputComponent label={'Введите логин'} name={'login'} title='Логин' />
				<InputComponent
					label={'Введите пароль'}
					name={'password'}
					title='Пароль'
				/>

				<SelectComponent
					label={'Администратор?'}
					name={'isAdmin'}
					value={watch('isAdmin')}
					onChange={value => setValue('isAdmin', value)}
					isRequired={false}
				>
					<Option key='1' value='false'>
						Нет
					</Option>
					<Option key='2' value='true'>
						Да
					</Option>
				</SelectComponent>
				<SelectComponent
					label={'Выберите регион'}
					name={'region'}
					value={watch('region')}
					onChange={value => setValue('region', value)}
					isRequired={false}
				>
					<Option key='1' value='Брестская область'>
						Брестская область
					</Option>
					<Option key='2' value='Витебская область'>
						Витебская область
					</Option>
					<Option key='3' value='Гомельская область'>
						Гомельская область
					</Option>
					<Option key='4' value='Гродненская область'>
						Гродненская область
					</Option>
					<Option key='5' value='Минская область'>
						Минская область
					</Option>
					<Option key='6' value='Могилевская область'>
						Могилевская область
					</Option>
					<Option key='7' value='Город Минск'>
						Город Минск
					</Option>
				</SelectComponent>
			</ModalForm>
			<Toaster />
		</>
	)
})

export default AdminUsersTable
