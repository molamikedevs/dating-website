'use server'
import { createClient } from '@/lib/supabase/server'
import { Profile } from '@/types'

// Function to like a profile
export const likeProfile = async (toUserId: string): Promise<{ success: boolean; message: string; isMatch?: boolean }> => {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    
    if (!data?.user) {
        return { success: false, message: 'User not authenticated' }
    }

    try {
        // Insert like into the database
        const { error } = await supabase
            .from('likes')
            .insert({
                from_user_id: data.user.id,
                to_user_id: toUserId
            })

        if (error) {
            return { success: false, message: 'Failed to like profile' }
        }

        // Check if this creates a mutual like (match)
        const { data: mutualLike } = await supabase
            .from('likes')
            .select('*')
            .eq('from_user_id', toUserId)
            .eq('to_user_id', data.user.id)
            .single()

        return { 
            success: true, 
            message: mutualLike ? 'It\'s a match! 🎉' : 'Profile liked!',
            isMatch: !!mutualLike
        }
    } catch (error) {
        console.error('Error liking profile:', error)
        return { success: false, message: 'An error occurred' }
    }
}

// Function to pass on a profile (we can track this if needed)
export const passProfile = async (): Promise<{ success: boolean; message: string }> => {
    // For now, we just return success since passing doesn't require database storage
    // But you could create a "passes" table if you want to track this
    return { success: true, message: 'Profile passed' }
}



// Function to get potential matches for the current user
export const getPotentialMatches = async (currentUserId: string): Promise<Profile[]> => {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    if (!data?.user) {
        throw new Error('User not authenticated')
    }

    // First, get the current user's profile to access their preferences
    const { data: currentUserProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUserId)
        .single()

    if (profileError || !currentUserProfile) {
        throw new Error('Failed to fetch user profile')
    }

    // Get profiles that the current user has already liked
    const { data: likedProfiles } = await supabase
        .from('likes')
        .select('to_user_id')
        .eq('from_user_id', currentUserId)

    // Get profiles that the current user has matched with
    const { data: matchedProfiles } = await supabase
        .from('matches')
        .select('user1_id, user2_id')
        .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)

    // Create arrays of user IDs to exclude
    const likedUserIds = likedProfiles?.map(like => like.to_user_id) || []
    const matchedUserIds = matchedProfiles?.flatMap(match => 
        match.user1_id === currentUserId ? [match.user2_id] : [match.user1_id]
    ) || []
    
    // Combine all user IDs to exclude
    const excludedUserIds = [...new Set([...likedUserIds, ...matchedUserIds, currentUserId])]

    // Get user's gender preferences from their profile
    const preferredGenders = currentUserProfile.preferences?.gender_preference || []
    
    // Build the query with gender filtering
    let query = supabase
        .from('profiles')
        .select('*')
        .not('id', 'in', `(${excludedUserIds.join(',')})`)

    // Apply gender preference filter if preferences exist
    if (preferredGenders && preferredGenders.length > 0) {
        query = query.in('gender', preferredGenders)
    }

    // Fetch potential matches with gender preferences applied
    const { data: potentialMatches, error } = await query.limit(50) // Limit to 50 profiles for performance

    if (error) {
        console.error('Error fetching potential matches:', error)
        throw new Error('Failed to fetch potential matches')
    }

    console.log(`🔍 Found ${potentialMatches?.length || 0} potential matches for user ${currentUserId}`)
    console.log(`👤 Current user gender: ${currentUserProfile.gender}`)
    console.log(`❤️ User prefers: ${preferredGenders.join(', ')}`)

    return potentialMatches as Profile[]
}
