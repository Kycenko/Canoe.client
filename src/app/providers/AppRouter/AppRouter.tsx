import { routeConfig } from '@app/providers/AppRouter/route.config.tsx'
import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRouter: FC = () => {
	return (
		<Routes>
			{Object.values(routeConfig).map(({ element, path }) => (
				<Route key={path} element={element} path={path} />
			))}
		</Routes>
	)
}

export default AppRouter
