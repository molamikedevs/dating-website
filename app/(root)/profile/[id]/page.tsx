import ProfileDetails from '@/components/profile/profile-details'
import Spinner from '@/components/spinner'
import { getCurrentUserProfile } from '@/lib/actions/action.profile'

const ProfileDetailsPage = async ({ params }: { params: { id: string } }) => {
	const profile = await getCurrentUserProfile(params.id)

	if (!profile) {
		return <Spinner />
	}

	return <ProfileDetails profile={profile} />
}

export default ProfileDetailsPage
