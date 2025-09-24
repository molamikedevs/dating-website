'use client'

import { Button } from './ui/button'
import { useAuth } from '@/context/auth-context'

const SignoutButton = () => {
	const { signOut } = useAuth()

	return (
		<Button variant="outline" onClick={() => signOut()}>
			Sign Out
		</Button>
	)
}

export default SignoutButton
