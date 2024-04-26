import { FC, InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
}
const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				type='text'
				ref={ref}
				className={className}
				{...props}
			/>
		)
	}
)

export default Input
