import { Button } from '@material-tailwind/react'
import InputComponent from '@src/components/UI/inputs/InputComponent'
import DatePickerComponent from '@src/components/UI/selects/DatePickerComponent'
import { createNotify } from '@src/components/UI/toasts/CreateNotify'
import Layout from '@src/components/layout/Layout'
import { useCreateCompetition } from '@src/entities/Competition/competition.queries'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Toaster } from 'sonner'

const AddCompetitionPage: FC = () => {
	const methods = useForm()
	const { watch, setValue, handleSubmit } = methods

	const createQuery = useCreateCompetition()

	const handleCreate = async data => {
		await createQuery.mutateAsync(data)
		createNotify()
	}

	return (
		<Layout>
			<div className='flex flex-col items-center justify-center min-h-screen m-auto	'>
				<div className='w-full max-w-md p-6 m-4 bg-white rounded shadow-md'>
					<h2 className='text-2xl font-bold text-center'>
						Создание соревнования
					</h2>
					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(handleCreate)} className='mt-4'>
							<div className='mb-4'>
								<InputComponent
									label={'Введите название'}
									name={'name'}
									value={watch('name')}
								/>
							</div>
							<div className='mb-4'>
								<DatePickerComponent
									label={'Дата начала'}
									showTimeSelect={true}
									name={'startDate'}
									selected={watch('startDate', new Date())}
									onChange={date => setValue('startDate', date)}
									maxDate={null}
									dateFormat={'dd.MM.yyyy HH:mm'}
								/>
							</div>
							<div className='mb-4'>
								<DatePickerComponent
									showTimeSelect={true}
									label={'Дата окончания'}
									name={'startDate'}
									selected={watch('finishDate', new Date())}
									onChange={date => setValue('finishDate', date)}
									maxDate={null}
									dateFormat={'dd.MM.yyyy HH:mm'}
								/>
							</div>
							<div className='mb-4'>
								<InputComponent
									label={'Введите место проведения'}
									name={'place'}
									value={watch('place')}
								/>
							</div>
							<div className='flex items-center justify-between'>
								<Button
									onClick={handleCreate}
									type='submit'
									className='px-6 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
									placeholder={undefined}
								>
									Создать соревнование
								</Button>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
			<Toaster />
		</Layout>
	)
}

export default AddCompetitionPage
