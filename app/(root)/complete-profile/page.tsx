'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { QuickFormValues } from '@/types'
import QuickProfileForm from '@/components/forms/quick-profile-form'
import { useAuth } from '@/context/auth-context'
import { createClient } from '@/lib/supabase/client'

export default function CompleteProfilePage() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const { session, refreshProfile } = useAuth()
	const supabase = createClient()
	const pathname = usePathname()

	// Set dynamic page title
	useEffect(() => {
		const title = 'Complete Your Profile'
		document.title = `${title} - NearMe`
	}, [pathname])

	const handleSubmit = async (values: Partial<QuickFormValues>) => {
		if (!session) {
			toast('No user session found!')
			return
		}

		setIsLoading(true)
		try {
			const { error } = await supabase.from('profiles').upsert({
				id: session?.user?.id,
				name: values.name,
				age: values.age,
				gender: values.gender,
				relationship_goals: values.relationship_goals,
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
			console.log(error)
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
