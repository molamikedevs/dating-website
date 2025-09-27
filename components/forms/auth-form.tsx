'use client'

import { useReducer } from 'react'
import { AuthFormAction, AuthFormModeProps, AuthFormState } from '@/types'
import ConfirmationMessage from '../confirmation-message'
import ModeToggle from '../mode-toggle'
import EmailForm from './email-form'
import { Heart } from 'lucide-react'
import GoogleSignInButton from '../google-signin-button'

const INITIAL_STATE = {
	email: '',
	loading: false,
	linkSent: false,
	password: '',
	error: null,
	acceptedTerms: false,
	showPassword: false,
}

const reducer = (
	state: AuthFormState,
	action: AuthFormAction
): AuthFormState => {
	switch (action.type) {
		case 'SET_EMAIL':
			return { ...state, email: action.payload }
		case 'SET_LOADING':
			return { ...state, loading: action.payload }
		case 'SET_LINK_SENT':
			return { ...state, linkSent: action.payload }
		case 'SET_PASSWORD':
			return { ...state, password: action.payload }
		case 'SET_ERROR':
			return { ...state, error: action.payload }
		case 'SET_ACCEPTED_TERMS':
			return { ...state, acceptedTerms: action.payload }
		case 'SET_SHOW_PASSWORD':
			return { ...state, showPassword: action.payload }
		default:
			return state
	}
}

export default function AuthForm({ mode }: AuthFormModeProps) {
	const [
		{ email, password, loading, linkSent, error, acceptedTerms, showPassword },
		dispatch,
	] = useReducer(reducer, INITIAL_STATE)

	// If a link has been sent, show the confirmation message
	if (linkSent) {
		return <ConfirmationMessage mode={mode} email={email} dispatch={dispatch} />
	}

	return (
		<div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 shadow-xl rounded-xl">
			<div className="text-center">
				<div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
					<Heart className="h-6 w-6 text-pink-600" />
				</div>
				<h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 text-transparent bg-clip-text">
					{mode === 'login' ? 'Welcome Back' : 'Create an Account'}
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					{mode === 'login'
						? 'Sign in to continue your journey'
						: 'Join us to find your perfect match'}
				</p>
			</div>
			{error && (
				<div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
					{error}
				</div>
			)}

			{/* Email and Password Form */}
			<EmailForm
				loading={loading}
				error={error}
				password={password}
				acceptedTerms={acceptedTerms}
				showPassword={showPassword}
				email={email}
				mode={mode}
				dispatch={dispatch}
			/>
			{/* Google Sign-In Button */}
			<GoogleSignInButton
				dispatch={dispatch}
				loading={loading}
				mode={mode}
				acceptedTerms={acceptedTerms}
			/>
			{/* Toggle between Sign In and Sign Up */}
			<ModeToggle mode={mode} />
		</div>
	)
}
