import { useLogin } from '@shared/auth/auth.queries.ts'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormProps {
	login: string
	password: string
}

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<LoginFormProps>()

	const loginMutation = useLogin()

	const [loginError, setLoginError] = useState<string | null>(null)

	const handleLogin = async (data: LoginFormProps) => {
		try {
			await loginMutation.mutateAsync(data)
			setLoginError(null)
			reset()
		} catch (error) {
			setLoginError('Неверный логин или пароль!')
			reset()
		}
	}

	return (
		<div className='relative flex flex-col justify-center overflow-hidden'>
			<div className='w-[400px] p-6 m-auto bg-[#ffffff] rounded-lg border lg:max-w-xl'>
				<h1 className='text-[28px] font-semibold text-center text-gray-800 '>
					Авторизация
				</h1>
				<form className='mt-6' onSubmit={handleSubmit(handleLogin)}>
					<div className='mb-2'>
						<label
							className='block text-sm font-semibold text-gray-800'
							htmlFor='login'
						>
							Логин:
						</label>
						<input
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
						{errors.login && (
							<p className='text-blue-500'>{errors.login.message}</p>
						)}
					</div>

					<div className='mb-2'>
						<label
							className='block text-sm font-semibold text-gray-800'
							htmlFor='password'
						>
							Пароль:
						</label>
						<input
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
						{errors.password && (
							<p className='text-blue-500'>{errors.password.message}</p>
						)}
					</div>

					{loginError && <p className='text-red-500'>{loginError}</p>}

					<div className='mt-6 flex justify-center'>
						<button
							className='w-[190px] px-4 py-2 tracking-wide text-white font-semibold transition-colors duration-200 transform border bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none'
							type='submit'
						>
							Войти
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
