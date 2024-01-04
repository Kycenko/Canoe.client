import { toast } from 'sonner'

export const createNotify = () => {
	toast.success('Операция создания завершена успешно', {
		position: 'top-center',
		duration: 1000
	})
}
