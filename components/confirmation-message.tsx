import { AuthFormAction, AuthFormModeProps } from '@/types'
import { Heart } from 'lucide-react'
import React from 'react'

interface ConfirmationMessageProps {
	mode: AuthFormModeProps['mode']
	email: string
	dispatch: React.Dispatch<AuthFormAction>
}

const ConfirmationMessage = ({
	mode,
	email,
	dispatch,
}: ConfirmationMessageProps) => {

	// Determine if the current mode is sign-in
	const isSignIn = mode === 'login'

	
	return (
		<div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 shadow-xl rounded-xl text-center space-y-6">
			<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
				<Heart className="h-8 w-8 text-green-600" />
			</div>
			<h2 className="text-2xl font-bold text-green-600">
				{isSignIn ? 'Check Your Email' : 'Almost There!'}
			</h2>
			<p className="text-gray-600 dark:text-gray-300">
				{isSignIn
					? `We sent a password reset link to <strong>${email}</strong>.`
					: `We sent a confirmation email to <strong>${email}</strong>.`}
				<br />
				{isSignIn
					? 'Click the link to reset your password.'
					: 'Click the link to verify your email and complete your profile.'}
			</p>
			<button
				onClick={() => dispatch({ type: 'SET_LINK_SENT', payload: false })}
				className="text-pink-600 hover:underline text-sm">
				Back to {isSignIn ? 'Login' : 'Sign Up'}
			</button>
		</div>
	)
}

export default ConfirmationMessage
