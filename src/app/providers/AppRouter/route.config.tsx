import HomePage from '@pages/HomePage/HomePage.tsx'
import LoginPage from '@pages/LoginPage/LoginPage.tsx'
import AddAthletePage from '@src/pages/AddAthletePage/AddAthletePage'
import AddCompetitionPage from '@src/pages/AddCompetitionPage/AddCompetitionPage'
import AdminPage from '@src/pages/AdminPage/AdminPage'
import {
	default as AdminAthletesPage,
	default as UserAthletesPage
} from '@src/pages/AthletesPage/admin/AdminAthletesPage'
import {
	default as AdminCompetitionsPage,
	default as UserCompetitionsPage
} from '@src/pages/CompetitionsPage/admin/AdminCompetitionsPage'
import EditAthletePage from '@src/pages/EditAthletePage/EditAthletePage'
import UsersPage from '@src/pages/UsersPage/admin/AdminUsersPage'
import { RouteProps } from 'react-router-dom'

export const enum AppRoutes {
	LOGIN = 'login',
	HOME = 'home',
	ADD_ATHLETE = 'add-athlete',
	EDIT_ATHLETE = 'edit-athlete',
	USER_ATHLETES = 'user-athletes',
	ADMIN_ATHLETES = 'admin-athletes',
	USER_COMPETITIONS = 'user-competitions',
	ADMIN_COMPETITIONS = 'admin-competitions',
	ADD_COMPETITION = 'add-competition',
	ADMIN_USERS = 'admin-users',
	MANAGEMENT = 'management'
}
export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.LOGIN]: '/auth/login',
	[AppRoutes.HOME]: '/',
	[AppRoutes.ADD_ATHLETE]: '/athletes/add',
	[AppRoutes.EDIT_ATHLETE]: '/athletes/edit/:id',
	[AppRoutes.USER_ATHLETES]: '/athletes',
	[AppRoutes.ADMIN_ATHLETES]: '/management/athletes',
	[AppRoutes.USER_COMPETITIONS]: '/competitions',
	[AppRoutes.ADMIN_COMPETITIONS]: '/management/competitions',
	[AppRoutes.MANAGEMENT]: '/management',
	[AppRoutes.ADMIN_USERS]: '/management/users',
	[AppRoutes.ADD_COMPETITION]: '/competitions/add'
}
export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.LOGIN]: {
		path: RoutePath.login,
		element: <LoginPage />
	},
	[AppRoutes.HOME]: {
		path: RoutePath.home,
		element: <HomePage />
	},
	[AppRoutes.ADD_ATHLETE]: {
		path: RoutePath['add-athlete'],
		element: <AddAthletePage />
	},
	[AppRoutes.EDIT_ATHLETE]: {
		path: RoutePath['edit-athlete'],
		element: <EditAthletePage />
	},
	[AppRoutes.USER_ATHLETES]: {
		path: RoutePath['user-athletes'],
		element: <UserAthletesPage />
	},
	[AppRoutes.ADMIN_ATHLETES]: {
		path: RoutePath['admin-athletes'],
		element: <AdminAthletesPage />
	},
	[AppRoutes.USER_COMPETITIONS]: {
		path: RoutePath['user-competitions'],
		element: <UserCompetitionsPage />
	},
	[AppRoutes.ADMIN_COMPETITIONS]: {
		path: RoutePath['admin-competitions'],
		element: <AdminCompetitionsPage />
	},
	[AppRoutes.MANAGEMENT]: {
		path: RoutePath.management,
		element: <AdminPage />
	},
	[AppRoutes.ADMIN_USERS]: {
		path: RoutePath['admin-users'],
		element: <UsersPage />
	},
	[AppRoutes.ADD_COMPETITION]: {
		path: RoutePath['add-competition'],
		element: <AddCompetitionPage />
	}
}
