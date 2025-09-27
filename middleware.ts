import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = await createClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()
	const url = req.nextUrl

	// Protect all authenticated routes
	if (!session) {
		if (url.pathname === '/' || 
		    url.pathname === '/complete-profile' || 
		    url.pathname === '/profile' ||
		    url.pathname === '/chats' ||
		    url.pathname === '/matches') {
			return NextResponse.redirect(new URL('/login', req.url))
		}
	}

	// Logged in but no profile → force complete-profile
	if (session) {
		const { data: profile } = await supabase
			.from('profiles')
			.select('id')
			.eq('id', session.user.id)
			.single()

		// If no profile and trying to access any route except complete-profile → redirect
		if (!profile && url.pathname !== '/complete-profile') {
			return NextResponse.redirect(new URL('/complete-profile', req.url))
		}

		// If profile exists and trying to access complete-profile → redirect to home
		if (profile && url.pathname === '/complete-profile') {
			return NextResponse.redirect(new URL('/', req.url))
		}
	}

	return res
}

export const config = {
	matcher: [
		'/', 
		'/complete-profile', 
		'/profile', 
		'/chats', 
		'/matches'
	]
}