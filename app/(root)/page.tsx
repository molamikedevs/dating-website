import { createClient } from '@/lib/supabase/server'
import { getPotentialMatches } from '@/lib/actions/action.matches'
import DiscoverStack from '@/components/discover-stack'

export const metadata = {
	title: 'Discover',
}

const DiscoverPage = async () => {
	const supabase = await createClient()

	// Ensure the user is authenticated
	const { data } = await supabase.auth.getUser()
	if (!data?.user) {
		throw new Error('User not authenticated')
	}

	// Fetch potential matches for the authenticated user
	const potentialMatches = await getPotentialMatches(data.user.id)

	return (
		<div className="container mx-auto px-4 py-8 min-h-screen">
			<div className="mb-4">
				<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600  to-purple-600 bg-clip-text text-transparent mb-2">
					Discover
				</h1>
			</div>

			{potentialMatches.length === 0 ? (
				<div className="text-center py-16">
					<div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full p-8 mb-6 w-32 h-32 mx-auto flex items-center justify-center">
						<span className="text-4xl">💔</span>
					</div>
					<h3 className="text-xl font-semibold mb-2">No matches found</h3>
					<p className="text-muted-foreground">
						Please update your preferences or check back later.
					</p>
				</div>
			) : (
				<DiscoverStack matches={potentialMatches} />
			)}
		</div>
	)
}

export default DiscoverPage
