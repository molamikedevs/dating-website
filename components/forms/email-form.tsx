import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { AuthFormAction, AuthFormModeProps } from '@/types'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface EmailFormProps {
	loading: boolean
	error: string | null
	acceptedTerms: boolean
	showPassword: boolean
	password: string
	email: string
	mode: AuthFormModeProps['mode']
	dispatch: React.Dispatch<AuthFormAction>
}

const EmailForm = ({
	loading,
	password,
	acceptedTerms,
	showPassword,
	email,
	mode,
	dispatch,
}: EmailFormProps) => {

	// Create Supabase client and router
	const supabase = createClient()
	const router = useRouter()

	// Determine if the current mode is sign-in
	const isSignIn = mode === 'login'

	// Function to handle email authentication (sign-in or sign-up)
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

				// Check if user has a profile
				if (data.user) {
					const { data: profile } = await supabase
						.from('profiles')
						.select('id')
						.eq('id', data.user.id)
						.single()

					if (profile) {
						router.push('/')
						router.refresh()
					} else {
						router.push('/complete-profile')
					}
				}
			} else {
				// Sign up with email confirmation
				const { data, error: signUpError } = await supabase.auth.signUp({
					email: email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/auth/callback`,
					},
				})

				if (signUpError) throw signUpError

				if (data.user?.identities?.length === 0) {
					throw new Error('User already registered')
				}

				dispatch({ type: 'SET_LINK_SENT', payload: true })
				toast.success('Check your email for confirmation link!')
			}
		} catch (err: unknown) {
			console.error(err)
			const errorMessage =
				err instanceof Error
					? err.message
					: 'An error occurred during authentication'
			dispatch({ type: 'SET_ERROR', payload: errorMessage })
			toast.error(errorMessage)
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}

	const handlePasswordReset = async () => {
		const supabase = createClient()
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
				redirectTo: `${window.location.origin}/reset-password`,
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

	return (
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
						placeholder={isSignIn ? 'Enter your password' : 'Create a password'}
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
	)
}

export default EmailForm
