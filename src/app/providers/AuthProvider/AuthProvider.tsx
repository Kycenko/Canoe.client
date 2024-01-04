import { IUser } from '@entities/User/user.types'
import { getAccessToken, removeFromStorage } from '@shared/auth/auth.helper'
import { LOCAL_STORAGE_KEY } from '@shared/lib/constants/enums'
import { getLocalStorage } from '@src/shared/lib/utils/getLocalStorage'

import {
	createContext,
	FC,
	PropsWithChildren,
	useEffect,
	useState
} from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)
	const navigate = useNavigate()
	useEffect(() => {
		const initializeAuth = async () => {
			const storedUser = getLocalStorage(LOCAL_STORAGE_KEY.USER)
			const accessToken = await getAccessToken()

			if (!accessToken) {
				removeFromStorage()
				navigate('/auth/login', { replace: true })
				return
			}

			if (storedUser && (!user || storedUser.id !== user.id)) {
				setUser(storedUser)
			} else if (!storedUser && !user && location.pathname !== '/auth/login') {
				navigate('/auth/login', { replace: true })
			} else if (storedUser && user && location.pathname === '/auth/login') {
				navigate('/', { replace: true })
			}
		}

		initializeAuth()
	}, [user, navigate, location])

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
