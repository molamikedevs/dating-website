'use client'

import { createClient } from '@/lib/supabase/client'
import { AuthContextType, Profile } from '@/types'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'

const supabase = createClient()

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [profile, setProfile] = useState<Profile | null>(null)
	const [authChecked, setAuthChecked] = useState(false)
	const [profileLoaded, setProfileLoaded] = useState(false)
	const router = useRouter()

	// On mount: check session and subscribe to auth changes
	useEffect(() => {
		let mounted = true

		const initAuth = async () => {
			try {
				const {
					data: { session },
					error,
				} = await supabase.auth.getSession()

				if (error) throw error
				if (!mounted) return

				setUser(session?.user ?? null)
			} catch (err) {
				console.error('Error loading session:', err)
			} finally {
				setAuthChecked(true)
			}
		}

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null)
			}
		)

		initAuth()

		return () => {
			mounted = false
			listener.subscription.unsubscribe()
		}
	}, [])

	// When user changes, fetch profile
	useEffect(() => {
		let active = true

		const loadProfile = async () => {
			if (!user) {
				setProfile(null)
				setProfileLoaded(true)
				return
			}

			try {
				const { data, error } = await supabase
					.from('users')
					.select('*')
					.eq('id', user.id)
					.single()

				if (error) {
					console.error('Profile fetch error:', error)
					setProfile(null)
				} else {
					if (active) setProfile(data)
				}
			} catch (err) {
				console.error('Unexpected error fetching profile:', err)
				setProfile(null)
			} finally {
				if (active) setProfileLoaded(true)
			}
		}

		loadProfile()

		return () => {
			active = false
		}
	}, [user])

	const signOut = async () => {
		const { error } = await supabase.auth.signOut()
		if (!error) {
			setUser(null)
			setProfile(null)
			router.push('/login')
		}
	}

	const loading = !authChecked || (user !== null && !profileLoaded)

	const value: AuthContextType = {
		user,
		profile,
		loading,
		signOut,
	}

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const ctx = useContext(AuthContext)
	if (!ctx) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return ctx
}
