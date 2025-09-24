import { useState, useCallback } from 'react'


export interface Location {
	city: string
	country: string
	formatted: string
}

interface UseGeolocationReturn {
	location: Location | null
	isLoading: boolean
	error: string | null
	getCurrentLocation: () => Promise<Location | null>
}

export const useGeolocation = (): UseGeolocationReturn => {
	const [location, setLocation] = useState<Location | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const getCurrentLocation = useCallback(async (): Promise<Location | null> => {
		setIsLoading(true)
		setError(null)

		try {
			// Check if geolocation is supported
			if (!navigator.geolocation) {
				throw new Error('Geolocation is not supported by your browser')
			}

			// Get current position
			const position = await new Promise<GeolocationPosition>(
				(resolve, reject) => {
					navigator.geolocation.getCurrentPosition(resolve, reject, {
						enableHighAccuracy: true,
						timeout: 10000,
						maximumAge: 60000,
					})
				}
			)

			const { latitude, longitude } = position.coords

			// Reverse geocode to get location details
			const response = await fetch(
				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
			)

			if (!response.ok) {
				throw new Error('Failed to fetch location data')
			}

			const data = await response.json()

			if (data.locality && data.countryName) {
				const newLocation: Location = {
					city: data.locality,
					country: data.countryName,
					formatted: `${data.locality}, ${data.countryName}`,
				}

				setLocation(newLocation)
				return newLocation
			} else {
				throw new Error('Could not determine location')
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to get location'
			setError(errorMessage)
			return null
		} finally {
			setIsLoading(false)
		}
	}, [])

	return { location, isLoading, error, getCurrentLocation }
}
