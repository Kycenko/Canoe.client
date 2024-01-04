import { Button } from '@material-tailwind/react'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface CustomButtonComponentProps {
	path?: string
	className?: string
	children: ReactNode
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
}

const CustomButtonComponent: FC<CustomButtonComponentProps> = ({
	path,
	children,
	onClick,
	className,
	type
}) => {
	return (
		<Link to={path}>
			<Button
				type={type}
				onClick={onClick}
				className={
					className ? className : 'flex items-center bg-blue-400 gap-3'
				}
				size='sm'
				placeholder={undefined}
			>
				{children}
			</Button>
		</Link>
	)
}

export default CustomButtonComponent
