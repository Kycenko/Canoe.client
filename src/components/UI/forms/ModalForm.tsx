import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Typography
} from '@material-tailwind/react'
import { FC, ReactNode } from 'react'
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm
} from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'

interface ModalFormProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: SubmitHandler<FieldValues>
	formTitle: string
	buttonTitle: string
	children: ReactNode
}

const ModalForm: FC<ModalFormProps> = ({
	isOpen,
	onClose,
	onSubmit,
	formTitle,
	buttonTitle,
	children
}) => {
	const methods = useForm()
	const { handleSubmit } = methods

	return (
		<Dialog
			className='pointer-events-auto'
			open={isOpen}
			size='xs'
			handler={onClose}
			placeholder={undefined}
		>
			<div className='flex items-center justify-between'>
				<DialogHeader
					className='flex flex-col items-start'
					placeholder={undefined}
				>
					<Typography className='mb-1' variant='h4' placeholder={undefined}>
						{formTitle}
					</Typography>
				</DialogHeader>
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
			</div>
			<DialogBody placeholder={undefined}>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>{children}</form>
				</FormProvider>
			</DialogBody>
			<DialogFooter className='space-x-2' placeholder={undefined}>
				<Button
					variant='text'
					color='gray'
					onClick={onClose}
					placeholder={undefined}
				>
					Закрыть
				</Button>
				<Button
					variant='gradient'
					color='green'
					type='submit'
					onClick={async () => {
						const isValid = await methods.trigger()
						if (isValid) {
							onSubmit(methods.getValues())
							methods.reset()
						}
					}}
					placeholder={undefined}
				>
					{buttonTitle}
				</Button>
			</DialogFooter>
		</Dialog>
	)
}

export default ModalForm
