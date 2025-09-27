'use client'

import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import  { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface CalendarProps {
	onChange: (date: Date) => void
	value: Date
	maxDate?: Date
	minDate?: Date
}



const CalendarInput = ({
	onChange,
	value,
	maxDate,
	minDate,
}: CalendarProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		value
	)
	
	const [isOpen, setIsOpen] = useState(false)

	// Calculate min and max dates based on age constraints (18-120 years)
	const calculatedMaxDate = maxDate || new Date()
	const calculatedMinDate =
		minDate ||
		new Date(
			calculatedMaxDate.getFullYear() - 120,
			calculatedMaxDate.getMonth(),
			calculatedMaxDate.getDate()
		)

	const handleSelect = (date: Date | undefined) => {
		setSelectedDate(date)
		if (date) {
			onChange(date)
			setIsOpen(false)
		}
	}

	// Calculate age from date for validation feedback
	const calculateAge = (date: Date): number => {
		const today = new Date()
		let age = today.getFullYear() - date.getFullYear()
		const monthDiff = today.getMonth() - date.getMonth()

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < date.getDate())
		) {
			age--
		}

		return age
	}

	const currentAge = selectedDate ? calculateAge(selectedDate) : null

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				{currentAge && (
					<span
						className={cn(
							'text-xs',
							currentAge < 18 || currentAge > 120
								? 'text-destructive'
								: 'text-muted-foreground'
						)}>
						{currentAge} years old
					</span>
				)}
			</div>

			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full justify-start text-left font-normal',
							!selectedDate && 'text-muted-foreground'
						)}>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={handleSelect}
						defaultMonth={selectedDate}
						fromDate={calculatedMinDate}
						toDate={calculatedMaxDate}
						captionLayout='dropdown'
						className="p-3"
						classNames={{
							day_selected:
								'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
							day_today: 'bg-accent text-accent-foreground',
							day_outside: 'text-muted-foreground opacity-50',
							day_disabled: 'text-muted-foreground opacity-50',
							day_range_middle:
								'aria-selected:bg-accent aria-selected:text-accent-foreground',
							day_hidden: 'invisible',
						}}
					/>
				</PopoverContent>
			</Popover>

			{selectedDate &&
				currentAge !== null &&
				(currentAge < 18 || currentAge > 120) && (
					<p className="text-sm text-destructive">
						{currentAge < 18
							? 'Must be at least 18 years old'
							: 'Maximum age is 120 years'}
					</p>
				)}
		</div>
	)
}

export default CalendarInput
