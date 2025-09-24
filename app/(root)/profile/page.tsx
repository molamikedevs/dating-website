import { redirect } from 'next/navigation'
import { getCurrentUserProfile } from '@/lib/actions/action.profile'
import ProfileCard from '@/components/profile/profile-card'

export const metadata = {
	title: 'Profile',
}

export default async function ProfilePage() {
	const profile = await getCurrentUserProfile()

	if (!profile) {
		redirect('/login')
	}

	return <ProfileCard profile={profile} />
}
