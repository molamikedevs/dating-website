// context/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextType, Profile, UserSession } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { getProfile } from '@/lib/actions/action.profile'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [session, setSession] = useState<UserSession | null>(null)
	const [profile, setProfile] = useState<Profile | null>(null)
	const [loading, setLoading] = useState(true)
	const supabase = createClient()
	const router = useRouter()

	// Function to refresh profile data
	const refreshProfile = async (userId: string) => {
		try {
			const userProfile = await getProfile(userId)
			setProfile(userProfile)
			return userProfile
		} catch (error) {
			console.error('Error refreshing profile:', error)
			setProfile(null)
			return null
		}
	}

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const {
					data: { session: authSession },
					error,
				} = await supabase.auth.getSession()

				if (error) {
					console.error('Error getting session:', error)
					setSession(null)
					setProfile(null)
					setLoading(false)
					return
				}

				if (authSession) {
					const newSession = {
						user: {
							id: authSession.user.id,
							email: authSession.user.email!,
							avatar_url: authSession.user.user_metadata?.avatar_url || null,
						},
						access_token: authSession.access_token,
					}
					setSession(newSession)

					// Load profile
					await refreshProfile(authSession.user.id)
				}
			} catch (error) {
				console.error('Error in auth initialization:', error)
				setSession(null)
				setProfile(null)
			} finally {
				setLoading(false)
			}
		}

		initializeAuth()

		// Auth state change listener
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, authSession) => {
			setLoading(true)

			if (authSession) {
				const newSession = {
					user: {
						id: authSession.user.id,
						email: authSession.user.email!,
						avatar_url: authSession.user.user_metadata?.avatar_url || null,
					},
					access_token: authSession.access_token,
				}
				setSession(newSession)

				// Refresh profile on auth changes
				await refreshProfile(authSession.user.id)

				// Refresh the page to update server components
				router.refresh()
			} else {
				setSession(null)
				setProfile(null)
			}

			setLoading(false)
		})

		return () => subscription.unsubscribe()
	}, [supabase, router])

	const signOut = async () => {
		setLoading(true)
		await supabase.auth.signOut()
		setSession(null)
		setProfile(null)
		setLoading(false)
		router.push('/login')
	}

	// Provide refreshProfile function in context
	const value: AuthContextType = {
		session,
		profile,
		loading,
		signOut,
		refreshProfile: (userId: string) => refreshProfile(userId),
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const ctx = useContext(AuthContext)
	if (!ctx) {
		throw new Error('useAuth must be used within a AuthProvider')
	}
	return ctx
}
