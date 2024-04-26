import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
	children,
	className,
	...props
}) => {
	return (
		<button
			className={className}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
