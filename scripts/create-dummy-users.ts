import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'


// Load environment variables from .env file
config({ path: '.env' })

// Initialize Supabase client with service role key (bypasses RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD!

// Test data arrays matching your schema
const names = [
  'Alexandra Martinez', 'Benjamin Chang', 'Camila Rodriguez', 'David Thompson',
  'Elena Popov', 'Francesco Silva', 'Grace Kim', 'Hassan Al-Rashid',
  'Isabella Chen', 'Jackson Williams'
]

const locations = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
  'Miami, FL', 'Seattle, WA', 'Boston, MA', 'Austin, TX',
  'San Francisco, CA', 'Denver, CO'
]

const occupations = [
  'Software Engineer', 'Marketing Manager', 'Graphic Designer', 'Teacher',
  'Nurse', 'Financial Analyst', 'Chef', 'Photographer',
  'Lawyer', 'Data Scientist'
]

const bios = [
  "Love hiking and exploring new coffee shops. Looking for someone who enjoys weekend adventures and deep conversations.",
  "Passionate about cooking and trying new cuisines. Let's discover the city's hidden gems together!",
  "Fitness enthusiast who loves yoga and running. Seeking someone who values health and mindfulness.",
  "Bookworm and movie buff. Perfect first date: cozy bookstore followed by indie film screening.",
  "Travel addict with stamps from 25 countries. Next destination: Japan. Care to join?",
  "Music lover who plays guitar and attends live concerts. Let's create our own soundtrack.",
  "Foodie and amateur photographer. Life's too short for bad meals and blurry photos.",
  "Tech geek by day, board game enthusiast by night. Let's solve problems and have fun!",
  "Art lover who spends weekends at galleries and museums. Beauty is everywhere if you look.",
  "Outdoor adventurer who loves camping and stargazing. Let's explore nature together."
]

const bodyTypes = ['Slim', 'Average', 'Athletic', 'Curvy', 'Fit', 'Toned', 'Muscular'] as const
const orientations = ['Straight', 'Gay', 'Bisexual'] as const
const smokingOpts = ['No', 'Occasionally'] as const
const drinkingOpts = ['No', 'Occasionally', 'Yes'] as const
const relationshipGoals = ['Long-term', 'Short-term', 'Friendship', 'Casual', 'Marriage'] as const
const educationOpts = ['College', 'University', 'Postgraduate'] as const
const genderOpts = ['Male', 'Female'] as const

const interestsList = [
  'Art', 'Books', 'Cooking', 'Dancing', 'Fitness', 'Gaming', 'Hiking',
  'Movies', 'Music', 'Photography', 'Tech', 'Travel', 'Volunteering', 'Yoga'
]

const hobbiesList = [
  'Baking', 'Board Games', 'Cycling', 'Gardening', 'Knitting', 'Painting',
  'Running', 'Swimming', 'Tennis', 'Writing'
]

const languagesList = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Chinese', 'Japanese', 'Korean', 'Hindi'
]

// Avatar URLs (using Unsplash for realistic photos)
const avatarUrls = [
  'https://images.unsplash.com/photo-1494790108755-2616b02c2f20?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face'
]

function getRandomItems<T>(array: readonly T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getRandomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

async function createDummyUsers() {
  console.log('🚀 Starting dummy user creation...')
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing environment variables. Please set:')
    console.error('- NEXT_PUBLIC_SUPABASE_URL')
    console.error('- SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const createdUsers: Array<{
    email: string
    password: string
    name: string
    userId: string
    profile: Record<string, unknown>
  }> = []

  const password = TEST_USER_PASSWORD

  for (let i = 0; i < 10; i++) {
    try {
      const name = names[i]
      const email = `testuser${i + 1}@example.com`
      
      console.log(`\n📝 Creating user ${i + 1}/10: ${name} (${email})`)

      // 1. Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          name: name
        }
      })

      if (authError) {
        console.error(`❌ Auth error for ${email}:`, authError.message)
        continue
      }

      const userId = authData.user.id
      console.log(`✅ Created auth user: ${userId}`)

      // 2. Create profile data
      const age = 22 + Math.floor(Math.random() * 18) // Age between 22-39
      const gender = genderOpts[i % 2] // Alternate between Male/Female
      const height = gender === 'Male' ? 170 + Math.floor(Math.random() * 25) : 160 + Math.floor(Math.random() * 20)
      
      const profileData = {
        id: userId,
        name: name,
        age: age,
        gender: gender,
        bio: bios[i],
        preferences: {
          distance: 25 + Math.floor(Math.random() * 25), // 25-50 km
          age_range: {
            min: Math.max(18, age - 5),
            max: age + 10
          },
          gender_preference: gender === 'Male' ? ['Female'] : ['Male']
        },
        location: locations[i],
        height: height,
        body_type: getRandomItem(bodyTypes),
        orientation: getRandomItem(orientations),
        interests: getRandomItems(interestsList, 3 + Math.floor(Math.random() * 4)), // 3-6 interests
        hobbies: getRandomItems(hobbiesList, 2 + Math.floor(Math.random() * 3)), // 2-4 hobbies
        languages: getRandomItems(languagesList, 1 + Math.floor(Math.random() * 2)), // 1-2 languages
        smoking: getRandomItem(smokingOpts),
        drinking: getRandomItem(drinkingOpts),
        education: getRandomItem(educationOpts),
        occupation: occupations[i],
        relationship_goals: getRandomItem(relationshipGoals),
        avatar_url: avatarUrls[i],
        gallery_images: [avatarUrls[i]], // Start with avatar as first gallery image
        is_online: Math.random() > 0.3, // 70% online
        is_verified: Math.random() > 0.5, // 50% verified
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_active: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() // Within last week
      }

      // 3. Insert profile into database
      const { data: profileResult, error: profileError } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single()

      if (profileError) {
        console.error(`❌ Profile error for ${email}:`, profileError.message)
        // Try to delete the auth user if profile creation failed
        await supabase.auth.admin.deleteUser(userId)
        continue
      }

      console.log(`✅ Created profile for: ${name}`)
      
      createdUsers.push({
        email,
        password,
        name,
        userId,
        profile: profileResult
      })

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))

    } catch (error) {
      console.error(`❌ Unexpected error creating user ${i + 1}:`, error)
    }
  }

  console.log('\n🎉 Dummy user creation completed!')
  console.log(`✅ Successfully created ${createdUsers.length}/10 users`)
  
  if (createdUsers.length > 0) {
    console.log('\n📋 Login credentials (all users have the same password):')
    console.log('Password for all users:', password)
    console.log('\nCreated users:')
    createdUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}: ${user.email}`)
    })
    
    console.log('\n💡 You can now login with any of these emails and the password:', password)
    console.log('\n🔗 Login at: http://localhost:3000/auth')
  }
}

// Run the script
createDummyUsers().catch(console.error)