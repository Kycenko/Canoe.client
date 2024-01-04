import { Input } from '@material-tailwind/react'

import { FC } from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

interface InputComponentProps {
	label: string
	name: string
	title?: string
	head?: string
	value?: string
	placeholder?: string
	isRequired?: boolean
	className?: string
	defaultValue?: string
}

const InputComponent: FC<InputComponentProps> = ({
	label,
	name,
	placeholder,
	head,
	isRequired = true,
	className,
	defaultValue
}) => {
	const {
		register,
		formState: { errors }
	} = useFormContext<FieldValues>()

	return (
		<div className='mb-2 flex flex-col'>
			<label className='block text-gray-700 text-sm font-bold mb-1'>
				{head}
			</label>
			<Input
				defaultValue={defaultValue}
				className={className}
				{...register(name, {
					required: isRequired ? 'Поле обязательно для заполнения' : false
				})}
				id={name}
				label={label}
				placeholder={placeholder}
				crossOrigin={undefined}
			/>
			{errors[name] && (
				<p className='text-blue-300'>{String(errors[name].message)}</p>
			)}
		</div>
	)
}

export default InputComponent
