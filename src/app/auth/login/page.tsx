import { LoginForm } from '@/components/LoginForm/LoginForm'

export default function LoginPage() {
	return (
		<div className='justify-center mt-20'>
			<div className='flex justify-center mb-10'>
				<img
					src='/logo.webp'
					alt='Logo'
				/>
			</div>
			<LoginForm />
		</div>
	)
}
