'use client'


import { toast } from 'sonner'
import { QuickFormValues } from '@/types'
import QuickProfileForm from '@/components/forms/quick-profile-form'
import { useAuth } from '@/context/auth-context'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CompleteProfilePage() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const { session, refreshProfile } = useAuth()
	const supabase = createClient()

	const handleSubmit = async (values: QuickFormValues) => {
		if (!session) {
			toast('No user session found!')
			return
		}

		setIsLoading(true)
		try {
			const preferencesData = {
				distance: 25, // Default distance for basic users
				age_range: {
					min: 18, // Default minimum age
					max: 50, // Default maximum age
				},
				gender_preference:
					values.preferences === 'Other' ? [] : [values.preferences],
			}

			const { error } = await supabase.from('profiles').upsert({
				id: session?.user?.id,
				name: values.name,
				age: values.age,
				gender: values.gender,
				location: values.location,
				preferences: preferencesData, // storing as structured object
				updated_at: new Date().toISOString(),
			})

			if (error) throw error

			if (session.user) {
				await refreshProfile(session.user.id)
			}

			toast('Profile created successfully!')
			router.push('/')
			router.refresh()
		} catch (error) {
			console.error('Error creating profile:', error)
			toast('Something went wrong. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<QuickProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
		</div>
	)
}