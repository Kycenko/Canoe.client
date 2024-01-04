import LoginForm from '@src/components/UI/forms/LoginForm'
import { FC } from 'react'

const LoginPage: FC = () => {
	return (
		<div className='justify-center mt-20'>
			<div className='flex justify-center mb-10'>
				<img src='/logo.webp' alt='Logo' />
			</div>
			<LoginForm />
		</div>
	)
}

export default LoginPage
