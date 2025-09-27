import { AuthFormModeProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const ModeToggle = ({ mode }: AuthFormModeProps) => {
  return (
    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
				{mode === 'login' ? (
					<>
						Don&rsquo;t have an account?{' '}
						<Link
							href="/register"
							className="text-pink-600 hover:underline font-semibold">
							Sign up
						</Link>
					</>
				) : (
					<>
						Already have an account?{' '}
						<Link
							href="/login"
							className="text-pink-600 hover:underline font-semibold">
							Sign in
						</Link>
					</>
				)}
			</p>
  )
}

export default ModeToggle