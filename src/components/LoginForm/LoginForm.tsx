'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ILogin } from '@/types/auth.types'

import ErrorMessage from '../ui/ErrorMessage'
import Button from '../ui/buttons/Button'
import Input from '../ui/inputs/Input'

import styles from './LoginForm.module.scss'
import { AuthService } from '@/services/auth.service'

export function LoginForm() {
	const { push } = useRouter()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ILogin>({
		mode: 'onChange'
	})

	const { mutate } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILogin) => AuthService.login(data),
		onSuccess() {
			reset()
			toast.success('Login success')
			push('/')
		}
	})

	const onSubmit = (data: ILogin) => {
		mutate(data)
	}

	return (
		<div className={styles.container}>
			<div className='w-[400px] p-6 m-auto bg-[#ffffff] rounded-lg border lg:max-w-xl'>
				<h1 className='text-[28px] font-semibold text-center text-gray-800 '>
					Авторизация
				</h1>
				<form
					className='mt-6'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='mb-2'>
						<label
							className='block text-sm font-semibold text-gray-800'
							htmlFor='login'
						>
							Логин:
						</label>
						<Input
							className='block w-full px-4 py-2 mt-2 text-[#424242] bg-white border rounded-md  focus:border-blue-300 focus:outline-none '
							type='text'
							id='login'
							{...register('login', {
								required: 'Обязательное поле!',
								minLength: {
									value: 4,
									message: 'Минимум 4 символа!'
								},
								maxLength: {
									value: 15,
									message: 'Максимум 15 символов!'
								}
							})}
						/>
						<ErrorMessage error={errors.login} />
					</div>

					<div className='mb-2'>
						<label
							className='block text-sm font-semibold text-gray-800'
							htmlFor='password'
						>
							Пароль:
						</label>
						<Input
							className='block w-full px-4 py-2 mt-2 text-[#424242] bg-white border rounded-md  focus:border-blue-300 focus:outline-none '
							type='password'
							id='password'
							{...register('password', {
								required: 'Обязательное поле!',
								minLength: {
									value: 6,
									message: 'Минимум 6 символов!'
								},
								maxLength: {
									value: 20,
									message: 'Максимум 20 символов!'
								}
							})}
						/>
						<ErrorMessage error={errors.password} />
					</div>

					<div className='mt-6 flex justify-center'>
						<Button className='w-[190px] px-4 py-2 tracking-wide text-white font-semibold transition-colors duration-200 transform border bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none'>
							Войти
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
