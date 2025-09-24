'use client'

import React, { useEffect, useReducer } from 'react'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Eye, EyeOff, Heart } from 'lucide-react'
import { AuthFormAction, AuthFormProps, AuthFormState } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

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

export default function AuthForm({ mode }: AuthFormProps) {
	const [
		{ email, password, loading, linkSent, error, acceptedTerms, showPassword },
		dispatch,
	] = useReducer(reducer, INITIAL_STATE)

	const isSignIn = mode === 'login'
	const supabase = createClient()
	const router = useRouter()
	const { user, loading: authLoading } = useAuth()

	useEffect(() => {
		if (!authLoading && user) {
			router.push('/')
		}
	}, [user, authLoading, router])

	const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch({ type: 'SET_ERROR', payload: null })

		if (!isSignIn && !acceptedTerms) {
			dispatch({
				type: 'SET_ERROR',
				payload: 'Please accept the terms and conditions',
			})
			return
		}

		dispatch({ type: 'SET_LOADING', payload: true })
		try {
			if (isSignIn) {
				const { data, error: signInError } =
					await supabase.auth.signInWithPassword({
						email,
						password,
					})
				if (signInError) throw signInError
				if (data.user && !data.session) {
					dispatch({
						type: 'SET_ERROR',
						payload: 'Please verify your email before logging in.',
					})
					return
				}
			} else {
				const { error: signUpError } = await supabase.auth.signUp({
					email,
					password,
				})
				if (signUpError) throw signUpError
				dispatch({ type: 'SET_LINK_SENT', payload: true })
			}
		} catch (err: unknown) {
			console.error(err)
			dispatch({
				type: 'SET_ERROR',
				payload:
					err instanceof Error
						? err.message
						: 'An error occurred during authentication',
			})
			toast.error('Failed to authenticate, please try again.')
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}


	const handlePasswordReset = async () => {
		if (!email) {
			dispatch({
				type: 'SET_ERROR',
				payload: 'Please enter your email address first',
			})
			return
		}

		dispatch({ type: 'SET_ERROR', payload: null })
		dispatch({ type: 'SET_LOADING', payload: true })

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password?type=recovery`,
			})

			if (error) throw error
			dispatch({ type: 'SET_LINK_SENT', payload: true })
			toast.success('Password reset email sent!')
		} catch (error: unknown) {
			console.error(error)
			dispatch({
				type: 'SET_ERROR',
				payload:
					error instanceof Error
						? error.message
						: 'Failed to send password reset email',
			})
			toast.error('Failed to send password reset email')
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}

	if (linkSent) {
		return (
			<div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 shadow-xl rounded-xl text-center space-y-6">
				<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
					<Heart className="h-8 w-8 text-green-600" />
				</div>
				<h2 className="text-2xl font-bold text-green-600">Check Your Email</h2>
				<p className="text-gray-600 dark:text-gray-300">
					We sent a magic link to <strong>{email}</strong>.
					<br /> Click the link to{' '}
					{mode === 'login' ? 'log in' : 'finish signing up'}.
				</p>
				<button
					onClick={() => dispatch({ type: 'SET_LINK_SENT', payload: false })}
					className="text-pink-600 hover:underline text-sm">
					Back to {isSignIn ? 'Login' : 'Sign Up'}
				</button>
			</div>
		)
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

			<form onSubmit={handleEmailAuth} className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						placeholder="Enter your email"
						className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-zinc-800 dark:text-white"
						value={email}
						onChange={e =>
							dispatch({ type: 'SET_EMAIL', payload: e.target.value })
						}
						required
					/>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							placeholder={
								isSignIn ? 'Enter your password' : 'Create a password'
							}
							className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-zinc-800 dark:text-white"
							value={password}
							onChange={e =>
								dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
							}
							required
						/>
						<button
							type="button"
							onClick={() =>
								dispatch({
									type: 'SET_SHOW_PASSWORD',
									payload: !showPassword,
								})
							}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
							{showPassword ? (
								<EyeOff className="h-5 w-5" />
							) : (
								<Eye className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>

				{isSignIn && (
					<button
						type="button"
						onClick={handlePasswordReset}
						className="text-pink-600 hover:underline text-sm text-right w-full">
						Forgot password?
					</button>
				)}

				{!isSignIn && (
					<div className="flex items-start space-x-3 py-2">
						<Checkbox
							id="terms"
							checked={acceptedTerms}
							onCheckedChange={checked =>
								dispatch({
									type: 'SET_ACCEPTED_TERMS',
									payload: checked === true,
								})
							}
							className="mt-0.5 data-[state=checked]:bg-pink-500 data-[state=checked]:text-white"
						/>
						<label
							htmlFor="terms"
							className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							I agree to the{' '}
							<Link href="/terms" className="text-pink-600 hover:underline">
								terms and conditions
							</Link>
						</label>
					</div>
				)}

				<button
					type="submit"
					disabled={loading || (!isSignIn && !acceptedTerms)}
					className="w-full py-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
					{loading ? 'Processing...' : isSignIn ? 'Sign In' : 'Create Account'}
				</button>

				{!isSignIn && !acceptedTerms && (
					<p className="text-sm text-red-600 dark:text-red-400 text-center mt-2">
						Please accept the terms and conditions to create an account.
					</p>
				)}
			</form>

			<div className="flex items-center gap-3">
				<hr className="flex-grow border-gray-300 dark:border-zinc-700" />
				<span className="text-sm text-gray-500">or continue with</span>
				<hr className="flex-grow border-gray-300 dark:border-zinc-700" />
			</div>


			<p className="text-center text-sm text-gray-600 dark:text-gray-400">
				{mode === 'login' ? (
					<>
						Don&rsquo;t have an account?{' '}
						<Link
							href="/register"
							className="text-pink-600 hover:underline font-semibold">
							Sign up
						</Link>
					</>
				) : (
					<>
						Already have an account?{' '}
						<Link
							href="/login"
							className="text-pink-600 hover:underline font-semibold">
							Sign in
						</Link>
					</>
				)}
			</p>
		</div>
	)
}
