import * as React from 'react'

import { IconSvgProps } from '@/types'

export const DiscordIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}>
			<path
				d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
				fill="currentColor"
			/>
		</svg>
	)
}

export const TwitterIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}>
			<path
				d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
				fill="currentColor"
			/>
		</svg>
	)
}

export const MoonFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}>
		<path
			d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
			fill="currentColor"
		/>
	</svg>
)

export const SunFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}>
		<g fill="currentColor">
			<path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
			<path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
		</g>
	</svg>
)

export const HeartFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}>
		<path
			d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
			fill="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
	</svg>
)

export const SearchIcon = (props: IconSvgProps) => (
	<svg
		aria-hidden="true"
		fill="none"
		focusable="false"
		height="1em"
		role="presentation"
		viewBox="0 0 24 24"
		width="1em"
		{...props}>
		<path
			d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
		<path
			d="M22 22L20 20"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
	</svg>
)

// LOGO ICON - HeartPulse (Symbol of love and connection)
export const Logo: React.FC<IconSvgProps> = ({
	size = 36,
	width = size,
	height = size,
	...props
}) => (
	<svg viewBox="0 0 24 24" fill="none" height={height} width={width} {...props}>
		<path
			fill="currentColor"
			d="M12.001 4.529c2.349-4.3 11.376-1.4 9.548 5.05-1.008 3.564-5.91 7.38-9.548 10.242-3.638-2.862-8.54-6.678-9.548-10.242C.623 3.13 9.65.229 12 4.529Z"
		/>
		<path
			fill="#F54C7A"
			d="M13 10h-1.5l-.5 1.5L9 8l-2 5h1.5l.5-1.5L11 16l2-6z"
		/>
	</svg>
)

// GOOGLE ICON (for login)
export const GoogleIcon = ({ size = 24, ...props }: IconSvgProps) => (
	<svg
		height={size}
		width={size}
		viewBox="0 0 256 262"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid"
		{...props}>
		<path
			d="M255.68 133.5c0-11.3-.9-19.6-2.8-28.2H130v51.2h72.9c-1.5 12.3-9.6 30.9-27.7 43.4l-.2 1.3 40.3 31.2 2.8.3c25.3-23.4 37.6-57.8 37.6-99z"
			fill="#4285F4"
		/>
		<path
			d="M130 261c34.5 0 63.4-11.4 84.5-31l-40.3-31.2c-10.9 7.4-25.6 12.6-44.2 12.6-33.8 0-62.4-22.3-72.6-53.1l-1.3.1-39.4 30.4-.5 1.2C37.4 227.1 80.8 261 130 261z"
			fill="#34A853"
		/>
		<path
			d="M57.4 158.3c-2.6-7.8-4.1-16-4.1-24.3 0-8.4 1.5-16.5 4-24.3l-.1-1.6-40-30.7-1.3.6C7.3 96.6 0 112.4 0 129.9c0 17.2 7 33.6 18.9 47.5l38.5-29.1z"
			fill="#FBBC05"
		/>
		<path
			d="M130 51.3c23.9 0 40.1 10.2 49.3 18.7l36-35.2C193.3 12.4 164.5 0 130 0 80.8 0 37.4 33.9 18.9 82.3l39.4 30.7C67.6 73.6 96.2 51.3 130 51.3z"
			fill="#EB4335"
		/>
	</svg>
)

// USER / PROFILE ICON
export const UserIcon = ({ size = 24, ...props }: IconSvgProps) => (
	<svg fill="none" height={size} width={size} viewBox="0 0 24 24" {...props}>
		<path
			d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
			fill="currentColor"
		/>
	</svg>
)

// MESSAGE ICON
export const MessageIcon = ({ size = 24, ...props }: IconSvgProps) => (
	<svg fill="none" height={size} width={size} viewBox="0 0 24 24" {...props}>
		<path
			d="M4 4h16v12H5.17L4 17.17V4Zm0-2a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Z"
			fill="currentColor"
		/>
	</svg>
)

// CHAT BUBBLE ICON
export const ChatBubbleIcon = ({ size = 24, ...props }: IconSvgProps) => (
	<svg fill="none" height={size} width={size} viewBox="0 0 24 24" {...props}>
		<path
			d="M2 21l1.65-4.95A8 8 0 1 1 12 20H4l-2 1Zm8-9h4v2h-4v-2Zm0-4h8v2h-8V8Z"
			fill="currentColor"
		/>
	</svg>
)

export const Dot = ({ size = 12, ...props }: IconSvgProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="lucide lucide-dot-icon lucide-dot"
		{...props}>
		<circle cx="12.1" cy="12.1" r="1" />
	</svg>
)

// Camera ICON
export const Camera = ({ size = 24, ...props }: IconSvgProps) => (
	<svg
		className="w-6 h-6 text-gray-800 dark:text-white"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		fill="none"
		viewBox="0 0 24 24"
		{...props}>
		<path
			stroke="currentColor"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
		/>
		<path
			stroke="currentColor"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
		/>
	</svg>
)

// ZoomIn ICON
export const ZoomIn = ({ size = 24, ...props }: IconSvgProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="lucide lucide-zoom-in-icon lucide-zoom-in"
		{...props}>
		<path d="M12 8v8m4-4H8" />
		<path d="M4 4h16v16H4z" />
	</svg>
)

// X ICON
export const X = ({ size = 24, ...props }: IconSvgProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="lucide lucide-x-icon lucide-x"
		{...props}>
		<path d="M18 6 6 18M6 6l12 12" />
	</svg>
)

export const Loader = ({ size = 24, ...props }: IconSvgProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="lucide lucide-loader-2-icon lucide-loader-2"
		{...props}>
		<path d="M12 2v4m0 12v4m10-10h-4M6 12H2" />
	</svg>
)

// Edit ICON
export const Edit = ({ size = 24, ...props }: IconSvgProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="lucide lucide-edit-icon lucide-edit"
		{...props}>
		<path d="M12 2l8 8-2 2-8-8 2-2Zm0 0l-8 8 2 2 8-8-2-2Z" />
	</svg>
)
