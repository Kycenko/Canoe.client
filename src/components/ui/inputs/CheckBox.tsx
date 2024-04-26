import { InputHTMLAttributes, forwardRef } from 'react'

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
	({ className, placeholder, type, ...props }, ref) => {
		return (
			<input
				className={className}
				ref={ref}
				type={'checkbox'}
				{...props}
			/>
		)
	}
)

export default CheckBox
