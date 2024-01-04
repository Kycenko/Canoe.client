import { toast } from 'sonner'

export const deleteNotify = () => {
	toast.success('Операция удаления завершена успешно', {
		position: 'top-center',
		duration: 1000
	})
}
