import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from './config/auth.config'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes('/auth/login')
	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL('/', url))
	}
	if (isAuthPage) {
		return NextResponse.next()
	}
	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/:path', '/auth/:path']
}
