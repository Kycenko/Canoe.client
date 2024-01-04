export const enum BASE_URL {
	BASE_URL = 'http://localhost:8888/'
}

export const enum SERVICE_URL {
	AUTH = 'auth',
	AUTH_ACCESS_TOKEN = 'auth/login/access-token',
	USERS = 'users',
	COMPETITIONS = 'competitions',
	ATHLETES = 'athletes'
}

export const enum LINKS {
	HOME = '/',
	ADD_ATHLETE = '/athletes/add',
	EDIT_ATHLETE = '/athletes/edit/',
	ADD_COMPETITION = '/competitions/add',
	EDIT_COMPETITION = '/competitions/edit/',
	MANAGEMENT = '/management',
	ADMIN_ATHLETES = '/management/athletes',
	ADMIN_COMPETITIONS = '/management/competitions',
	ADMIN_USERS = '/management/users'
}

export const enum SERVICE_METHOD {
	POST = 'POST',
	GET = 'GET',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

export const enum TOKENS {
	ACCESS_TOKEN = 'access-token',
	REFRESH_TOKEN = 'refresh-token'
}

export const enum LOCAL_STORAGE_KEY {
	USER = 'user'
}

export const enum QUERY_KEYS {
	COMPETITIONS = 'competitions',
	ATHLETES = 'athletes',
	USERS = 'users'
}
