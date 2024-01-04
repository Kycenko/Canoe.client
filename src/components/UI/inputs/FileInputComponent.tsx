import { FC } from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

interface FileInputComponentProps {
	title: string
	name: string
	value?: string
	onChange?: (value: any) => void
}

const FileInputComponent: FC<FileInputComponentProps> = ({
	title,
	name,
	value
}) => {
	const { register } = useFormContext<FieldValues>()

	return (
		<>
			<div className='flex '>
				<input
					type='file'
					{...register(name, {
						required: false
					})}
					id={name}
					value={value}
					accept='image/*'
					className='cursor-pointer '
					style={{
						display: 'none',
						opacity: 0
					}}
				/>
				<label
					htmlFor={name}
					className='cursor-pointer align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs shadow-md shadow-gray-900/10  hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
				>
					{title}
				</label>
			</div>
		</>
	)
}

export default FileInputComponent
