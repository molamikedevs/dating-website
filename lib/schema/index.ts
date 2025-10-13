import { z } from 'zod'

export const bodyTypes = [
	'Slim',
	'Average',
	'Athletic',
	'Curvy',
	'Fit',
	'Chubby',
	'Petite',
	'Toned',
	'Muscular',
	'Heavyset',
] as const

export const orientations = ['Straight', 'Gay', 'Bisexual', 'Asexual'] as const

export const smokingOpts = ['No', 'Occasionally', 'Yes'] as const
export const drinkingOpts = ['No', 'Occasionally', 'Yes'] as const

export const relationshipGoals = [
	'Long-term',
	'Short-term',
	'Friendship',
	'Unsure',
	'Casual',
	'Marriage',
	'Networking',
] as const

export const educationOpts = [
	'High-school',
	'College',
	'University',
	'Postgraduate',
] as const

export const genderOpts = ['Male', 'Female', 'Other'] as const


export const interestsList = [
	'Art',
	'Books',
	'Cooking',
	'Dancing',
	'Fitness',
	'Gaming',
	'Hiking',
	'Movies',
	'Music',
	'Photography',
	'Tech',
	'Travel',
	'Volunteering',
	'Yoga',
] as const

export const hobbiesList = [
	'Baking',
	'Board Games',
	'Cycling',
	'Gardening',
	'Knitting',
	'Painting',
	'Running',
	'Swimming',
	'Tennis',
	'Writing',
] as const

export const languagesList = [
	'English',
	'Spanish',
	'French',
	'German',
	'Italian',
	'Portuguese',
	'Russian',
	'Turkish',
	'Arabic',
	'Persian',
	'Azerbaijani',
	'Chinese',
	'Japanese',
	'Korean',
	'Hindi',
] as const

export const quickFormSchema = z.object({
	name: z.string().min(2).max(100),
	age: z
		.number()
		.min(18, { message: 'Must be at least 18 years old' })
		.max(120, { message: 'Maximum age is 120 years' })
		.refine(age => age >= 18 && age <= 120, {
			message: 'Age must be between 18 and 120 years',
		}),
	gender: z.enum(genderOpts),
	location: z.string().min(1).max(100),
	preferences: z.enum(genderOpts).or(z.literal('Other')),
})

/* ---------- Full Profile form schema ---------- */
export const formSchema = z.object({
	orientation: z.enum(orientations),
	smoking: z.enum(smokingOpts),
	drinking: z.enum(drinkingOpts),
	body_type: z.enum(bodyTypes),
	education: z.enum(educationOpts),
	relationshipGoals: z.array(z.enum(relationshipGoals)),
	bio: z.string().max(500),
	height: z.number().min(120).max(250),
	zodiac_sign: z.string().min(1).max(50),
	location: z.string().min(1),
	interests: z.array(z.string()),
	hobbies: z.array(z.string()),
	languages: z.array(z.string()),
	occupation: z.string(),
	profile_picture: z.instanceof(File),
})

