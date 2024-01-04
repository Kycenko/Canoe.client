import { toast } from 'sonner'

export const updateNotify = () => {
	toast.success('Операция изменения завершена успешно', {
		position: 'top-center',
		duration: 1000
	})
}
