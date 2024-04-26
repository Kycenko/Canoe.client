import { FieldError } from 'react-hook-form'

const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
	return error && <p className='text-blue-500'>{error.message}</p>
}

export default ErrorMessage
