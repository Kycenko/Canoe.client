import {
	useFetchAthlete,
	useFetchAthleteImages,
	useUpdateAthlete
} from '@entities/Athlete/athlete.queries'
import { Button, Option } from '@material-tailwind/react'
import FileInputComponent from '@src/components/UI/inputs/FileInputComponent'
import InputComponent from '@src/components/UI/inputs/InputComponent'
import DatePickerComponent from '@src/components/UI/selects/DatePickerComponent'
import SelectComponent from '@src/components/UI/selects/SelectComponent'
import { updateNotify } from '@src/components/UI/toasts/UpdateNotify'
import Layout from '@src/components/layout/Layout'
import { BASE_URL } from '@src/shared/lib/constants/enums'
import { FC, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Toaster } from 'sonner'

const EditAthletePage: FC = () => {
	const { id } = useParams()
	const { data: athlete } = useFetchAthlete(id)
	const { data: images } = useFetchAthleteImages(id)
	const methods = useForm()
	const { watch, handleSubmit, setValue } = methods

	const updateQuery = useUpdateAthlete()
	const handleUpdate = async data => {
		const formData = new FormData()
		formData.append('name', data.name)
		formData.append('surname', data.surname)
		formData.append('secondName', data.secondName)
		formData.append('birthDate', new Date(data.birthDate).toISOString())
		formData.append('region', data.region)
		formData.append('rank', data.rank)
		formData.append('type', data.type)
		if (data.avatar && data.avatar[0] instanceof File)
			formData.append('avatar', data.avatar[0])

		if (data.passport && data.passport[0] instanceof File)
			formData.append('passport', data.passport[0])

		if (data.certificate && data.certificate[0] instanceof File)
			formData.append('certificate', data.certificate[0])

		await updateQuery.mutateAsync({ id: id, data: formData as any })
		updateNotify()
	}

	useEffect(() => {
		if (athlete) {
			setValue('name', athlete?.name)
			setValue('surname', athlete?.surname)
			setValue('secondName', athlete?.secondName)
			setValue('birthDate', new Date(athlete?.birthDate))
			setValue('rank', athlete?.rank)
			setValue('region', athlete?.region)
			setValue('type', athlete?.type)
		}
	}, [athlete, setValue])

	return (
		<Layout>
			<div className='container h-screen mx-auto p-8'>
				<h1 className='text-3xl text-center font-semibold mb-4'>
					Изменение спортсмена
				</h1>
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(handleUpdate)}
						className='grid grid-cols-3 gap-8 mb-10'
					>
						<div className='col-span-1'>
							<div className='mb-4'>
								<InputComponent
									title={'Фамилия'}
									name={'surname'}
									label={'Введите фамилию'}
									value={watch('surname')}
								/>
							</div>
							<div className='mb-4'>
								<InputComponent
									title={'Имя'}
									name={'name'}
									label={'Введите имя'}
									value={watch('name')}
								/>
							</div>
							<div className='mb-4'>
								<InputComponent
									title={'Отчество'}
									name={'secondName'}
									label={'Введите отчество'}
									isRequired={false}
									value={watch('secondName')}
								/>
							</div>
							<div className='mb-4'>
								<DatePickerComponent
									label={'Дата рождения'}
									name={'birthDate'}
									selected={watch('birthDate')}
									onChange={date => setValue('birthDate', date)}
									maxDate={new Date()}
									dateFormat={'dd.MM.yyyy'}
								/>
							</div>
							<div className='mb-4'>
								<SelectComponent
									label={'Выберите регион'}
									name={'region'}
									value={watch('region')}
									onChange={value => setValue('region', value)}
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
							</div>
							<div className='mb-4'>
								<SelectComponent
									label={'Выберите тип'}
									name={'type'}
									value={watch('type')}
									onChange={value => setValue('type', value)}
								>
									<Option key='1' value='К'>
										К
									</Option>
									<Option key='2' value='Л'>
										Л
									</Option>
								</SelectComponent>
							</div>
							<div className='mb-4'>
								<SelectComponent
									label={'Выберите спортивное звание'}
									name={'rank'}
									value={watch('rank')}
									onChange={value => setValue('rank', value)}
								>
									<Option key='1' value='ЗМС'>
										ЗМС
									</Option>
									<Option key='2' value='МСМК'>
										МСМК
									</Option>
									<Option key='3' value='МС'>
										МС
									</Option>
									<Option key='4' value='КМС'>
										КМС
									</Option>
								</SelectComponent>
							</div>
						</div>

						<div className='col-span-1 flex flex-col items-center justify-center'>
							<div className='flex justify-center items-center border-dashed border-2'>
								<img
									src={
										images?.avatar && images?.avatar !== 'null'
											? `${BASE_URL.BASE_URL}${images?.avatar}`
											: '/upload-file.png'
									}
									alt='Фото лица'
									className='w-40 h-40 object-cover'
								/>
							</div>
							<div className='mt-6'>
								<FileInputComponent title={'Фото лица'} name={'avatar'} />
							</div>
						</div>

						<div className='col-span-1'>
							<div className='mb-4 flex flex-col items-center justify-center'>
								<FileInputComponent title={'Фото паспорта'} name={'passport'} />
								<div className='flex justify-center items-center w-72 h-72 mt-2 border-dashed border-2'>
									<img
										src={
											images?.passport && images?.passport !== 'null'
												? `${BASE_URL.BASE_URL}${images?.passport}`
												: '/upload-file.png'
										}
										alt='Фото паспорта'
										className={
											images?.passport
												? 'w-60 h-60 object-cover'
												: 'w-32 h-32 object-cover'
										}
									/>
								</div>
							</div>
							<div className='mb-4 flex flex-col items-center justify-center'>
								<FileInputComponent
									title={'Медицинская справка'}
									name={'certificate'}
								/>
								<div className='flex justify-center items-center w-72 h-72 mt-2 border-dashed border-2'>
									<img
										src={
											images?.certificate && images?.certificate !== 'null'
												? `${BASE_URL.BASE_URL}${images?.certificate}`
												: '/upload-file.png'
										}
										alt='Фото справки'
										className={
											images?.certificate
												? 'w-60 h-60 object-cover'
												: 'w-32 h-32 object-cover'
										}
									/>
								</div>
							</div>
						</div>

						<div className='col-span-3 flex gap-2 justify-end'>
							<Button
								type='submit'
								onClick={handleUpdate}
								className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
								placeholder={undefined}
							>
								Изменить спортсмена
							</Button>
						</div>
					</form>
				</FormProvider>
			</div>
			<Toaster />
		</Layout>
	)
}

export default EditAthletePage
