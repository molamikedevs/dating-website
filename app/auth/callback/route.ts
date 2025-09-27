import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')

	if (code) {
		const supabase = await createClient()

		const { error } = await supabase.auth.exchangeCodeForSession(code)

		if (!error) {
			// Successfully confirmed email, redirect to complete-profile
			return NextResponse.redirect(new URL('/complete-profile', request.url))
		}
	}

	// Redirect to login with error message if verification fails
	return NextResponse.redirect(
		new URL('/login?error=Email confirmation failed', request.url)
	)
}
