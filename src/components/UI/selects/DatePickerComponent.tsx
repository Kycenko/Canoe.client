import ru from 'date-fns/locale/ru'
import { FC } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FieldValues, useFormContext } from 'react-hook-form'
interface DatePickerComponentProps {
	label: string
	name: string
	selected: Date | string | null
	onChange: (any) => void
	className?: string
	maxDate: Date | null
	dateFormat: string
	showTimeSelect?: boolean
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({
	label,
	name,
	selected,
	onChange,
	className,
	maxDate,
	dateFormat,
	showTimeSelect
}) => {
	const {
		register,
		formState: { errors }
	} = useFormContext<FieldValues>()
	return (
		<div className='flex mb-2 flex-col'>
			<label className='block text-gray-700 text-sm font-bold mb-2'>
				{label}
			</label>
			<DatePicker
				{...register(name, {
					required: 'Поле обязательно для заполнения'
				})}
				id={name}
				showIcon
				showTimeSelect={showTimeSelect}
				selected={selected}
				onChange={date => onChange(date)}
				dateFormat={dateFormat}
				type='date'
				className={
					className
						? className
						: 'appearance-none w-full border border-gray-400 rounded-md py-2 px-3 leading-tight focus:outline-none  focus:border-black'
				}
				calendarClassName=''
				locale={ru}
				maxDate={maxDate}
			/>

			{errors[name] && (
				<p className='text-blue-300'>{String(errors[name].message)}</p>
			)}
		</div>
	)
}

export default DatePickerComponent
