'use server'


import { createClient } from '@/lib/supabase/server'
import { Profile } from '@/types'

export async function getProfile(userId: string) {
	const supabase = await createClient()
	const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', userId)
		.single()

	if (error) {
		return null
	}

	return profile as Profile
}


export async function getCurrentUserProfile() {
	const supabase = await createClient()
	const { data: authData, error: authError } = await supabase.auth.getUser()

	if (authError || !authData.user) {
		console.error('Auth error:', authError)
		throw new Error('User not authenticated')
	}

	const userId = authData.user.id

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', userId)
		.single()

	if (profileError) {
		console.error('Profile fetch error:', profileError)
		throw new Error('Failed to fetch user profile')
	}

	return profile
}

// Add this function to your action.profile.ts file
export async function getNameChangeEligibility(): Promise<{
	can_change_name: boolean
	days_remaining: number
	last_name_change: string | null
} | null> {
	const supabase = await createClient()

	try {
		const { data, error } = await supabase.rpc('get_name_change_eligibility')

		if (error) {
			console.error('Error checking name change eligibility:', error)
			return null
		}

		return data
	} catch (error) {
		console.error('Error in getNameChangeEligibility:', error)
		return null
	}
}

// Get profile by ID (for public profiles)
export async function getProfileById(
	profileId: string
): Promise<Profile | null> {
	const supabase = await createClient()
	const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', profileId)
		.single()

	if (error) {
		console.error('Profile fetch error:', error)
		return null
	}

	return profile
}

export async function updateProfile(
	updates: Partial<Profile>
): Promise<Profile> {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) throw new Error('Not authenticated')

	const { data: profile, error } = await supabase
		.from('profiles')
		.update({ ...updates, updated_at: new Date().toISOString() })
		.eq('id', user.id)
		.select()
		.single()

	if (error) throw error
	return profile
}

export async function uploadToBucket(
	file: File,
	bucket: 'profile_images' | 'profile_avatars'
): Promise<string> {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) throw new Error('Not authenticated')

	const arrayBuffer = await file.arrayBuffer()
	const fileExt = file.name.split('.').pop()
	const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`

	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(fileName, arrayBuffer, {
			contentType: file.type,
		})

	if (error) throw error

	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(data.path)

	return publicUrl
}

export async function deleteGalleryImage(imageUrls: string[]): Promise<void> {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) throw new Error('Not authenticated')

	const { error } = await supabase
		.from('profiles')
		.update({
			gallery_images: imageUrls,
			updated_at: new Date().toISOString(),
		})
		.eq('id', user.id)

	if (error) throw error
}