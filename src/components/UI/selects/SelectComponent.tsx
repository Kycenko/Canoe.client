import { Select } from '@material-tailwind/react'
import { FC, ReactNode } from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

interface SelectComponentProps {
	label: string
	name: string
	value: string
	title?: string
	onChange: (value: string | number) => void
	children: ReactNode
	isRequired?: boolean
}

const SelectComponent: FC<SelectComponentProps> = ({
	label,
	name,
	value,
	onChange,
	children,
	title,
	isRequired = true
}) => {
	const {
		register,
		formState: { errors }
	} = useFormContext<FieldValues>()
	return (
		<div className='flex mb-2 flex-col'>
			<label className='block text-gray-700 text-sm font-bold mb-1'>
				{title}
			</label>
			<Select
				id={name}
				{...register(name, {
					required: isRequired ? 'Поле обязательно для заполнения' : false
				})}
				label={label}
				value={value}
				placeholder={undefined}
				onChange={value => onChange(value)}
			>
				{children}
			</Select>
			{errors[name] && (
				<p className='text-blue-300'>{String(errors[name].message)}</p>
			)}
		</div>
	)
}

export default SelectComponent
