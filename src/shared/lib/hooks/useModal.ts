import { useState } from 'react'

export const useModal = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedId, setSelectedId] = useState<number | string | null>(null)

	const openModal = id => {
		setSelectedId(id)
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return {
		isOpen,
		selectedId,
		openModal,
		closeModal
	}
}
