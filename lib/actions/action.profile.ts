'use server'


import { createClient } from '@/lib/supabase/server'
import { Profile } from '@/types'


export async function getProfile(userId: string) {
	const supabase = await createClient()

	// Fetch profile by user ID
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

export async function getCurrentUserProfile(userId: string) {
	const supabase = await createClient()
	const { data: authData, error: authError } = await supabase.auth.getUser()

	if (authError || !authData.user) {
		console.error('Auth error:', authError)
	}

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', userId)
		.single()

	if (profileError) {
		console.error('Profile fetch error:', profileError)
	}

	return profile as Profile
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

	// Check if user is authenticated
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) throw new Error('Not authenticated')

	// Read file as ArrayBuffer
	const arrayBuffer = await file.arrayBuffer()

	// Extract file extension
	const fileExt = file.name.split('.').pop()

	// Check for valid file extension
	const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`

	// Upload to Supabase Storage
	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(fileName, arrayBuffer, {
			contentType: file.type,
		})

	if (error) throw error

	// Get public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(data.path)

	return publicUrl
}

export async function deleteGalleryImage(imageUrls: string[]): Promise<void> {
	const supabase = await createClient()

	// Check if user is authenticated
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