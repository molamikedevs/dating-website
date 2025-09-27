'use client'

import React from 'react'
import { Button } from './ui/button'
import { GoogleIcon } from './icons'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { AuthFormAction, AuthFormModeProps} from '@/types'

interface GoogleSignInButtonProps {
	dispatch: React.Dispatch<AuthFormAction>
	loading: boolean
	mode: AuthFormModeProps['mode']
	acceptedTerms: boolean
}

const GoogleSignInButton = ({
	dispatch,
	loading,
	mode,
	acceptedTerms,
}: GoogleSignInButtonProps) => {

    // Determine if the current mode is sign-in
    const isSignIn = mode === 'login'


    // Function to handle Google Sign-In
	const handleGoogleSignIn = async () => {
		const supabase = createClient()

		dispatch({ type: 'SET_LOADING', payload: true })
		dispatch({ type: 'SET_ERROR', payload: null })

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
				},
			})

			if (error) throw error
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Google sign-in failed'
			dispatch({ type: 'SET_ERROR', payload: errorMessage })
			toast.error(errorMessage)
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}

	return (
		<>
			<div className="flex items-center gap-3">
				<hr className="flex-grow border-gray-300 dark:border-zinc-700" />
				<span className="text-sm text-gray-500">or continue with</span>
				<hr className="flex-grow border-gray-300 dark:border-zinc-700" />
			</div>
			{/* Google Sign-In Button */}
			<Button
				type="button"
				onClick={handleGoogleSignIn}
				disabled={loading || (!isSignIn && !acceptedTerms)}
				variant="outline"
				className="w-full cursor-pointer flex items-center justify-center gap-2">
				<GoogleIcon />
				Continue with Google
			</Button>
		</>
	)
}

export default GoogleSignInButton
