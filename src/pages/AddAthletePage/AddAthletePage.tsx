import { useCreateAthlete } from '@entities/Athlete/athlete.queries'
import { Button, Option } from '@material-tailwind/react'
import FileInputComponent from '@src/components/UI/inputs/FileInputComponent'
import InputComponent from '@src/components/UI/inputs/InputComponent'
import DatePickerComponent from '@src/components/UI/selects/DatePickerComponent'
import SelectComponent from '@src/components/UI/selects/SelectComponent'
import { createNotify } from '@src/components/UI/toasts/CreateNotify'
import Layout from '@src/components/layout/Layout'

import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Toaster } from 'sonner'

const AddAthletePage: FC = () => {
	const methods = useForm()
	const { watch, handleSubmit, setValue } = methods
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
	const [passportUrl, setPassportUrl] = useState<string | null>(null)
	const [certificateUrl, setCertificateUrl] = useState<string | null>(null)

	const createQuery = useCreateAthlete()
	const handleCreate = async data => {
		const isValid = await methods.trigger()
		if (isValid) {
			const formData = new FormData()
			formData.append('name', data.name)
			formData.append('surname', data.surname)
			formData.append('secondName', data.secondName)
			formData.append('birthDate', new Date(data.birthDate).toISOString())
			formData.append('region', data.region)
			formData.append('rank', data.rank)
			formData.append('type', data.type)
			if (data.avatar && data.avatar[0]) {
				formData.append('avatar', data.avatar[0])
			}
			if (data.passport && data.passport[0]) {
				formData.append('passport', data.passport[0])
			}
			if (data.certificate && data.certificate[0]) {
				formData.append('certificate', data.certificate[0])
			}
			await createQuery.mutateAsync(formData)
			methods.reset({
				name: '',
				surname: '',
				secondName: '',
				birthDate: new Date(),
				region: '',
				rank: '',
				type: ''
			})
			createNotify()
		}
	}

	const avatarFile = watch('avatar')
	const passportFile = watch('passport')
	const certificateFile = watch('certificate')

	useEffect(() => {
		if (avatarFile && avatarFile[0]) {
			setAvatarUrl(URL.createObjectURL(avatarFile[0]))
		}
		if (passportFile && passportFile[0]) {
			setPassportUrl(URL.createObjectURL(passportFile[0]))
		}
		if (certificateFile && certificateFile[0]) {
			setCertificateUrl(URL.createObjectURL(certificateFile[0]))
		}
	}, [avatarFile, passportFile, certificateFile])

	return (
		<Layout>
			<div className='container max-w-[1140px] h-screen mx-auto p-6'>
				<h1 className='text-3xl text-center font-semibold mb-4'>
					Создание спортсмена
				</h1>
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(handleCreate)}
						className='grid grid-cols-3 gap-8 mb-10'
					>
						<div className='col-span-1'>
							<div className='mb-4'>
								<InputComponent
									title={'Фамилия'}
									name={'name'}
									label={'Введите фамилию'}
									value={watch('name')}
								/>
							</div>
							<div className='mb-4'>
								<InputComponent
									title={'Имя'}
									name={'surname'}
									label={'Введите имя'}
									value={watch('surname')}
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
									selected={new Date()}
									label={'Дата рождения'}
									name={'birthDate'}
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
							<div className='flex justify-center items-center'>
								<img
									src={avatarUrl ? avatarUrl : '/upload-file.png'}
									className='w-40 h-40 object-cover border-dashed border-2'
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
										src={passportUrl ? passportUrl : '/upload-file.png'}
										alt='Athlete Avatar'
										className={
											passportUrl
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
										src={certificateUrl ? certificateUrl : '/upload-file.png'}
										alt='Athlete Avatar'
										className={
											certificateUrl
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
								onClick={handleCreate}
								className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
								placeholder={undefined}
							>
								Создать спортсмена
							</Button>
						</div>
					</form>
				</FormProvider>
			</div>
			<Toaster />
		</Layout>
	)
}

export default AddAthletePage
