import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader
} from '@material-tailwind/react'
import { FC, ReactNode } from 'react'

interface DeleteConfirmFormProps {
	Open: boolean
	onClose: () => void
	onSubmit: () => void
	formTitle: string
	children?: ReactNode
}

const DeleteConfirmForm: FC<DeleteConfirmFormProps> = ({
	Open,
	onClose,
	onSubmit,
	formTitle,
	children
}) => {
	return (
		<>
			<Dialog size='xs' open={Open} handler={onClose} placeholder={undefined}>
				<DialogHeader className='text-lg' placeholder={undefined}>
					{formTitle}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='h-5 w-5 cursor-pointer absolute top-2 right-2'
						onClick={onClose}
					>
						<path
							fillRule='evenodd'
							d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
							clipRule='evenodd'
						/>
					</svg>
				</DialogHeader>
				<DialogBody placeholder={undefined}>{children}</DialogBody>
				<DialogFooter placeholder={undefined}>
					<Button
						variant='text'
						color='gray'
						onClick={onClose}
						className='mr-1'
						placeholder={undefined}
					>
						<span>Нет</span>
					</Button>
					<Button
						variant='gradient'
						color='red'
						onClick={onSubmit}
						placeholder={undefined}
					>
						<span>Да</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	)
}

export default DeleteConfirmForm
