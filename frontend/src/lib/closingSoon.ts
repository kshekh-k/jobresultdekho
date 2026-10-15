/**
 * Closing Soon Job Eligibility and Utilities
 *
 * Determines which jobs qualify for the "Closing Soon" feature:
 * - Belongs to the existing job collection (stage === 'Job' if stage is present)
 * - Published and publicly accessible (publishedAt is not null/false)
 * - Has a valid application closing date (last_date)
 * - Closing date has not passed (diffDays >= 0)
 * - Deadline falls within the next 7 calendar days, including today (0 <= diffDays <= 7)
 * - Date comparison is normalized to calendar days using the site's established timezone (Asia/Kolkata / IST)
 *   to avoid time-of-day or UTC conversion errors.
 * - Results are sorted by earliest closing date first.
 * - Duplicate entries are prevented.
 */

export interface ClosingSoonEligibleJob {
	id?: number | string;
	title?: string;
	slug?: string;
	last_date?: string | null;
	stage?: string;
	publishedAt?: string | null;
	total_posts?: number;
	reference_url?: string;
	Link_not_available?: boolean;
	Start_date?: boolean;
	Apply_date_Start_message?: string;
	department?: any;
	category?: any;
	[key: string]: any;
}

/**
 * Normalizes a date string or Date object to calendar components [year, month, day].
 * Handles 'YYYY-MM-DD', ISO strings, or Date instances.
 */
export function parseDateComponents(
	dateInput: string | Date | null | undefined
): { year: number; month: number; day: number } | null {
	if (!dateInput) return null;

	if (typeof dateInput === 'string') {
		const trimmed = dateInput.trim();
		if (!trimmed) return null;

		// Check for YYYY-MM-DD prefix (standard in Strapi date fields)
		const match = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
		if (match) {
			const year = parseInt(match[1], 10);
			const month = parseInt(match[2], 10);
			const day = parseInt(match[3], 10);

			// Validate basic calendar boundaries
			if (month < 1 || month > 12 || day < 1 || day > 31) return null;

			// Validate month lengths & leap years
			const d = new Date(Date.UTC(year, month - 1, day));
			if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) {
				return null;
			}

			return { year, month, day };
		}

		// Fallback for full ISO or other standard date string formats
		const parsed = new Date(trimmed);
		if (isNaN(parsed.getTime())) return null;
		return {
			year: parsed.getUTCFullYear(),
			month: parsed.getUTCMonth() + 1,
			day: parsed.getUTCDate()
		};
	}

	if (dateInput instanceof Date) {
		if (isNaN(dateInput.getTime())) return null;
		return {
			year: dateInput.getFullYear(),
			month: dateInput.getMonth() + 1,
			day: dateInput.getDate()
		};
	}

	return null;
}

/**
 * Returns today's calendar date components [year, month, day] in the specified timezone.
 * Defaults to 'Asia/Kolkata' (IST, UTC+5:30) as used by the site.
 */
export function getNowInTimezone(
	now: Date = new Date(),
	timeZone: string = 'Asia/Kolkata'
): { year: number; month: number; day: number } {
	try {
		const formatter = new Intl.DateTimeFormat('en-US', {
			timeZone,
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		});
		const parts = formatter.formatToParts(now);
		let year = 0,
			month = 0,
			day = 0;
		for (const part of parts) {
			if (part.type === 'year') year = parseInt(part.value, 10);
			if (part.type === 'month') month = parseInt(part.value, 10);
			if (part.type === 'day') day = parseInt(part.value, 10);
		}
		if (year && month && day) return { year, month, day };
	} catch {
		// Fallback to local time components if Intl fails
	}

	return {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate()
	};
}

/**
 * Computes calendar days remaining until the target date.
 * Returns:
 *   0: closes today
 *   1: closes tomorrow
 *   7: closes in exactly 7 days
 *  <0: expired (closing date has passed)
 *  >7: more than 7 days remaining
 *  null: invalid or missing date
 */
export function getCalendarDaysRemaining(
	dateInput: string | Date | null | undefined,
	now: Date = new Date(),
	timeZone: string = 'Asia/Kolkata'
): number | null {
	const target = parseDateComponents(dateInput);
	if (!target) return null;

	const current = getNowInTimezone(now, timeZone);

	// Both dates normalized to UTC midnight - guaranteed zero DST or time-of-day discrepancy
	const targetUtc = Date.UTC(target.year, target.month - 1, target.day);
	const currentUtc = Date.UTC(current.year, current.month - 1, current.day);
	const msPerDay = 1000 * 60 * 60 * 24;

	return Math.round((targetUtc - currentUtc) / msPerDay);
}

/**
 * Determines whether a job qualifies for the Closing Soon section.
 * Requirements:
 * - Belongs to the existing job collection (stage === 'Job' if stage is present)
 * - Is published and publicly accessible (publishedAt is not null/empty/false)
 * - Has a valid application closing date
 * - Closing date has not passed
 * - Deadline falls within the next 7 calendar days, including today (0 to 7 days)
 */
export function isJobClosingSoon(
	job: ClosingSoonEligibleJob | null | undefined,
	now: Date = new Date(),
	timeZone: string = 'Asia/Kolkata'
): boolean {
	if (!job) return false;

	// Belongs to the existing job collection
	if (job.stage && job.stage !== 'Job') return false;

	// Published post check (if publishedAt field is present on object)
	if ('publishedAt' in job && (job.publishedAt === null || job.publishedAt === '')) {
		return false;
	}

	// Must have a valid application closing date
	if (!job.last_date) return false;

	const daysRemaining = getCalendarDaysRemaining(job.last_date, now, timeZone);
	if (daysRemaining === null) return false;

	// Closing date has not passed AND deadline falls within next 7 calendar days (0 to 7)
	return daysRemaining >= 0 && daysRemaining <= 7;
}

/**
 * Deduplicates an array of jobs by ID or slug.
 */
export function deduplicateJobs<T extends ClosingSoonEligibleJob>(jobs: T[]): T[] {
	const seen = new Set<string | number>();
	const deduped: T[] = [];

	for (const job of jobs) {
		const key =
			job.id !== undefined && job.id !== null
				? `id-${job.id}`
				: job.slug
					? `slug-${job.slug}`
					: null;
		if (key) {
			if (seen.has(key)) continue;
			seen.add(key);
		}
		deduped.push(job);
	}

	return deduped;
}

/**
 * Sorts jobs by earliest closing deadline first (0 days first, then 1, ..., 7).
 * Secondary sort: title (alphabetical) or ID.
 */
export function sortJobsByClosingSoon<T extends ClosingSoonEligibleJob>(
	jobs: T[],
	now: Date = new Date(),
	timeZone: string = 'Asia/Kolkata'
): T[] {
	return [...jobs].sort((a, b) => {
		const aDays = getCalendarDaysRemaining(a.last_date, now, timeZone);
		const bDays = getCalendarDaysRemaining(b.last_date, now, timeZone);

		const aVal = aDays !== null ? aDays : Infinity;
		const bVal = bDays !== null ? bDays : Infinity;

		if (aVal !== bVal) {
			return aVal - bVal;
		}

		// Secondary fallback: title
		const aTitle = a.title || '';
		const bTitle = b.title || '';
		return aTitle.localeCompare(bTitle);
	});
}

/**
 * Filter, deduplicate, and sort jobs that qualify for Closing Soon.
 */
export function filterClosingSoonJobs<T extends ClosingSoonEligibleJob>(
	jobs: T[],
	now: Date = new Date(),
	timeZone: string = 'Asia/Kolkata'
): T[] {
	if (!Array.isArray(jobs)) return [];

	const eligible = jobs.filter((job) => isJobClosingSoon(job, now, timeZone));
	const deduped = deduplicateJobs(eligible);
	return sortJobsByClosingSoon(deduped, now, timeZone);
}

/**
 * Returns deadline badge information for UI display.
 * Ensures deadline indicator does not rely on color alone.
 */
export function getDeadlineBadge(
	dateInput: string | Date | null | undefined,
	now: Date = new Date(),
	timeZone: string = 'Asia/Kolkata'
): {
	days: number;
	label: string;
	isUrgent: boolean;
	textClass: string;
	bgClass: string;
	borderClass: string;
} | null {
	const days = getCalendarDaysRemaining(dateInput, now, timeZone);
	if (days === null || days < 0 || days > 7) return null;

	if (days === 0) {
		return {
			days,
			label: 'Closes Today',
			isUrgent: true,
			textClass: 'text-rose-700',
			bgClass: 'bg-rose-50',
			borderClass: 'border-rose-200'
		};
	}

	if (days === 1) {
		return {
			days,
			label: '1 Day Left',
			isUrgent: true,
			textClass: 'text-rose-700',
			bgClass: 'bg-rose-50',
			borderClass: 'border-rose-200'
		};
	}

	return {
		days,
		label: `${days} Days Left`,
		isUrgent: false,
		textClass: 'text-amber-800',
		bgClass: 'bg-amber-50',
		borderClass: 'border-amber-200'
	};
}

/**
 * Formats a Date object to YYYY-MM-DD string in a specified timezone.
 */
export function formatDateToYYYYMMDD(
	date: Date = new Date(),
	timeZone: string = 'Asia/Kolkata'
): string {
	const { year, month, day } = getNowInTimezone(date, timeZone);
	const m = String(month).padStart(2, '0');
	const d = String(day).padStart(2, '0');
	return `${year}-${m}-${d}`;
}

/**
 * Returns the 7-day query window strings { todayStr, endDateStr } in IST.
 */
export function getClosingSoonDateRange(
	now: Date = new Date(),
	timeZone: string = 'Asia/Kolkata'
): { todayStr: string; endDateStr: string } {
	const todayParts = getNowInTimezone(now, timeZone);
	const todayUtc = Date.UTC(todayParts.year, todayParts.month - 1, todayParts.day);
	const futureUtc = new Date(todayUtc + 7 * 24 * 60 * 60 * 1000);

	const todayStr = `${todayParts.year}-${String(todayParts.month).padStart(2, '0')}-${String(todayParts.day).padStart(2, '0')}`;
	const endDateStr = `${futureUtc.getUTCFullYear()}-${String(futureUtc.getUTCMonth() + 1).padStart(2, '0')}-${String(futureUtc.getUTCDate()).padStart(2, '0')}`;

	return { todayStr, endDateStr };
}
