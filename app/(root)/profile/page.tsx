import { redirect } from 'next/navigation'
import { getCurrentUserProfile } from '@/lib/actions/action.profile'
import ProfileCard from '@/components/profile/profile-card'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
	title: 'Profile',
}

export default async function ProfilePage() {
	const supabase = await createClient()
	// Ensure the user is authenticated
	const { data: authData } = await supabase.auth.getUser()
	if (!authData?.user) {
		redirect('/login')
	}
	// Get current user profile
	const profile = await getCurrentUserProfile(authData.user.id)

	return <ProfileCard profile={profile} />
}
