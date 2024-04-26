import { ReactNode, SelectHTMLAttributes, forwardRef, memo } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	children: ReactNode
	id: string
	label: string
	className?: string
}

const Select = memo(
	forwardRef<HTMLSelectElement, SelectProps>(
		({ id, label, children, className, ...props }, ref) => {
			return (
				// <div className={styles.container}>
				// 	<label className={styles.label}>{label}</label>
				// 	<select
				// 		id={id}
				// 		ref={ref}
				// 		className={className ? className : styles.select}
				// 		{...props}
				// 	>
				// 		{children}
				// 	</select>
				// </div>
				<select
					id={id}
					ref={ref}
					className={className}
					{...props}
				>
					{children}
				</select>
			)
		}
	)
)
export default Select
