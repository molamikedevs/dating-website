'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { genderOpts, quickFormSchema } from '@/lib/schema'
import { z } from 'zod'
import CalendarInput from '../calendar'
import LocationInput from '../location-input'

export type QuickFormValues = z.infer<typeof quickFormSchema>

interface QuickProfileFormProps {
	onSubmit: (values: QuickFormValues) => void
	isLoading?: boolean
}

export default function QuickProfileForm({
	onSubmit,
	isLoading = false,
}: QuickProfileFormProps) {
	const form = useForm<QuickFormValues>({
		resolver: zodResolver(quickFormSchema),
		defaultValues: {
			name: '',
			age: 18,
			gender: 'Male',
			location: '',
			preferences: 'Female',
		},
		mode: 'onBlur',
	})

	// ✅ Explicitly typed handler fixes the mismatch
	const handleSubmit: SubmitHandler<QuickFormValues> = values => {
		onSubmit(values)
	}

	return (
		<div className="bg-background text-foreground max-w-md mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-semibold">Get Started</h1>
				<p className="text-muted-foreground mt-2">
					Add basic info to start matching. You can complete your profile later.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					{/* Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Your name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Date of Birth → Age */}
					<FormField
						control={form.control}
						name="age"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date of Birth</FormLabel>
								<FormControl>
									<CalendarInput
										onChange={(date: Date) => {
											const today = new Date()
											let age = today.getFullYear() - date.getFullYear()
											const monthDiff = today.getMonth() - date.getMonth()

											if (
												monthDiff < 0 ||
												(monthDiff === 0 && today.getDate() < date.getDate())
											) {
												age--
											}

											field.onChange(age)
										}}
										value={
											new Date(
												new Date().getFullYear() - (field.value || 18),
												0,
												1
											)
										}
										maxDate={new Date()}
										minDate={new Date(new Date().getFullYear() - 120, 0, 1)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Gender */}
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Gender</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select gender" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{genderOpts.map(g => (
											<SelectItem key={g} value={g}>
												{g}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Preferences */}
					<FormField
						control={form.control}
						name="preferences"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Who do you want to match with?</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="What are you looking for?" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{genderOpts.map(g => (
											<SelectItem key={g} value={g}>
												{g}
											</SelectItem>
										))}
										<SelectItem value="Other">Other</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Location */}
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Location</FormLabel>
								<FormControl>
									<div>
										<Input
											{...field}
											onChange={e => field.onChange(e.target.value)}
										/>
										<LocationInput
											value={field.value}
											onChange={field.onChange}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						disabled={isLoading}
						className="w-full bg-gradient-to-r from-pink-700 via-pink-500 to-pink-600 hover:bg-gradient-to-l transition-all duration-300 text-white py-3 text-lg cursor-pointer">
						{isLoading ? 'Saving...' : 'Start Matching'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
