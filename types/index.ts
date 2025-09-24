import { formSchema } from "@/lib/schema"
import { User } from "@supabase/supabase-js"
import { SVGProps } from "react"
import z from "zod"


// Reusable SVG icon props type
export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

// Infer the form values type from the Zod schema
export type FormValues = z.infer<typeof formSchema>


// Props for the MobileNav component
export interface MobileNavProps {
	isOpen: boolean
	onClose: () => void
	pathname: string
	profile: Profile | null
	unreadCountsByType: { message: number; like: number }
}


// Props for the AuthForm component
export interface AuthFormState {
	email: string
	loading: boolean
	linkSent: boolean
	password: string
	error: string | null
	acceptedTerms: boolean
	showPassword: boolean
}

// Props for the AuthForm mode component
export interface AuthFormProps {
	mode: 'login' | 'register'
}


// Define action types for the AuthForm reducer
export type AuthFormAction =
	| { type: 'SET_EMAIL'; payload: string }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_LINK_SENT'; payload: boolean }
	| { type: 'SET_PASSWORD'; payload: string }
	| { type: 'SET_ERROR'; payload: string | null }
	| { type: 'SET_ACCEPTED_TERMS'; payload: boolean }
	| { type: 'SET_SHOW_PASSWORD'; payload: boolean }


	// Interface for a user profile attributes
	export interface Profile {
	id: string
	name: string
	email: string
	age: number
	gender: string
	bio: string
	preferences: UserPreferences
	location: string
	height: number
	body_type?: string
	orientation?: string
	interests: string[]
	hobbies: string[]
	languages: string[]
	zodiac_sign?: string
	smoking?: string
	drinking?: string
	relationship_goals?: string
	education?: string
	occupation?: string
	gallery_images?: string[]
	updated_at?: string
	created_at?: string
	last_active?: string
	is_online?: boolean
	is_verified?: boolean
	avatar_url: string
	location_lat: number
	location_lng: number
}

// Interface for user preferences within a profile
interface UserPreferences {
	date_range: {
		min: number;
		max: number;
	};
	distance: number;
	gender_preference: 'male' | 'female' | 'other';
}

// Define the shape of the AuthContext
export interface AuthContextType {
	user: User | null
	profile: Profile | null
	loading: boolean
	signOut: () => Promise<void>
}

