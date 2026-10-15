import assert from 'node:assert/strict';

// Import or recreate the functions to test them under Node
function parseDateComponents(dateInput) {
	if (!dateInput) return null;

	if (typeof dateInput === 'string') {
		const trimmed = dateInput.trim();
		if (!trimmed) return null;

		const match = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
		if (match) {
			const year = parseInt(match[1], 10);
			const month = parseInt(match[2], 10);
			const day = parseInt(match[3], 10);

			if (month < 1 || month > 12 || day < 1 || day > 31) return null;

			const d = new Date(Date.UTC(year, month - 1, day));
			if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) {
				return null;
			}

			return { year, month, day };
		}

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

function getNowInTimezone(now = new Date(), timeZone = 'Asia/Kolkata') {
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
		// Fallback
	}
	return {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate()
	};
}

function getCalendarDaysRemaining(dateInput, now = new Date(), timeZone = 'Asia/Kolkata') {
	const target = parseDateComponents(dateInput);
	if (!target) return null;

	const current = getNowInTimezone(now, timeZone);

	const targetUtc = Date.UTC(target.year, target.month - 1, target.day);
	const currentUtc = Date.UTC(current.year, current.month - 1, current.day);
	const msPerDay = 1000 * 60 * 60 * 24;

	return Math.round((targetUtc - currentUtc) / msPerDay);
}

function isJobClosingSoon(job, now = new Date(), timeZone = 'Asia/Kolkata') {
	if (!job) return false;
	if (job.stage && job.stage !== 'Job') return false;
	if ('publishedAt' in job && (job.publishedAt === null || job.publishedAt === '')) return false;
	if (!job.last_date) return false;

	const daysRemaining = getCalendarDaysRemaining(job.last_date, now, timeZone);
	if (daysRemaining === null) return false;

	return daysRemaining >= 0 && daysRemaining <= 7;
}

function deduplicateJobs(jobs) {
	const seen = new Set();
	const deduped = [];
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

function sortJobsByClosingSoon(jobs, now = new Date(), timeZone = 'Asia/Kolkata') {
	return [...jobs].sort((a, b) => {
		const aDays = getCalendarDaysRemaining(a.last_date, now, timeZone);
		const bDays = getCalendarDaysRemaining(b.last_date, now, timeZone);
		const aVal = aDays !== null ? aDays : Infinity;
		const bVal = bDays !== null ? bDays : Infinity;
		if (aVal !== bVal) return aVal - bVal;
		return (a.title || '').localeCompare(b.title || '');
	});
}

function filterClosingSoonJobs(jobs, now = new Date(), timeZone = 'Asia/Kolkata') {
	if (!Array.isArray(jobs)) return [];
	const eligible = jobs.filter((job) => isJobClosingSoon(job, now, timeZone));
	const deduped = deduplicateJobs(eligible);
	return sortJobsByClosingSoon(deduped, now, timeZone);
}

function getClosingSoonDateRange(now = new Date(), timeZone = 'Asia/Kolkata') {
	const todayParts = getNowInTimezone(now, timeZone);
	const todayUtc = Date.UTC(todayParts.year, todayParts.month - 1, todayParts.day);
	const futureUtc = new Date(todayUtc + 7 * 24 * 60 * 60 * 1000);

	const todayStr = `${todayParts.year}-${String(todayParts.month).padStart(2, '0')}-${String(todayParts.day).padStart(2, '0')}`;
	const endDateStr = `${futureUtc.getUTCFullYear()}-${String(futureUtc.getUTCMonth() + 1).padStart(2, '0')}-${String(futureUtc.getUTCDate()).padStart(2, '0')}`;

	return { todayStr, endDateStr };
}

// ==========================================
// TEST SUITE: Section 8 Verification
// ==========================================
console.log('🧪 Starting Closing Soon Unit Test Suite...');

const mockNow = new Date('2026-10-14T15:11:36+05:30'); // Today: 2026-10-14 in IST

// 1. A job closing today is included (0 days)
const jobClosingToday = {
	id: 1,
	title: 'Job Closing Today',
	last_date: '2026-10-14',
	stage: 'Job',
	publishedAt: '2026-10-01'
};
assert.equal(
	getCalendarDaysRemaining(jobClosingToday.last_date, mockNow),
	0,
	'Days remaining should be 0'
);
assert.equal(
	isJobClosingSoon(jobClosingToday, mockNow),
	true,
	'Job closing today must be included'
);
console.log('✅ 1. Job closing today is included');

// 2. A job closing in 3 days is included (3 days)
const jobClosingIn3Days = {
	id: 2,
	title: 'Job Closing in 3 Days',
	last_date: '2026-10-17',
	stage: 'Job',
	publishedAt: '2026-10-01'
};
assert.equal(
	getCalendarDaysRemaining(jobClosingIn3Days.last_date, mockNow),
	3,
	'Days remaining should be 3'
);
assert.equal(
	isJobClosingSoon(jobClosingIn3Days, mockNow),
	true,
	'Job closing in 3 days must be included'
);
console.log('✅ 2. Job closing in 3 days is included');

// 3. A job closing exactly 7 days from today is included (7 days)
const jobClosingIn7Days = {
	id: 3,
	title: 'Job Closing in 7 Days',
	last_date: '2026-10-21',
	stage: 'Job',
	publishedAt: '2026-10-01'
};
assert.equal(
	getCalendarDaysRemaining(jobClosingIn7Days.last_date, mockNow),
	7,
	'Days remaining should be 7'
);
assert.equal(
	isJobClosingSoon(jobClosingIn7Days, mockNow),
	true,
	'Job closing in exactly 7 days must be included'
);
console.log('✅ 3. Job closing in exactly 7 days is included');

// 4. A job closing 8 days from today is excluded (8 days)
const jobClosingIn8Days = {
	id: 4,
	title: 'Job Closing in 8 Days',
	last_date: '2026-10-22',
	stage: 'Job',
	publishedAt: '2026-10-01'
};
assert.equal(
	getCalendarDaysRemaining(jobClosingIn8Days.last_date, mockNow),
	8,
	'Days remaining should be 8'
);
assert.equal(
	isJobClosingSoon(jobClosingIn8Days, mockNow),
	false,
	'Job closing in 8 days must be excluded'
);
console.log('✅ 4. Job closing 8 days from today is excluded');

// 5. An expired job is excluded (-1 days, -10 days)
const jobExpiredYesterday = {
	id: 5,
	title: 'Expired Job Yesterday',
	last_date: '2026-10-13',
	stage: 'Job',
	publishedAt: '2026-10-01'
};
const jobExpiredLastMonth = {
	id: 6,
	title: 'Expired Job Last Month',
	last_date: '2026-09-14',
	stage: 'Job',
	publishedAt: '2026-09-01'
};
assert.equal(isJobClosingSoon(jobExpiredYesterday, mockNow), false, 'Expired job must be excluded');
assert.equal(isJobClosingSoon(jobExpiredLastMonth, mockNow), false, 'Expired job must be excluded');
console.log('✅ 5. Expired jobs are excluded');

// 6. An unpublished job is excluded
const unpublishedJob = {
	id: 7,
	title: 'Unpublished Job',
	last_date: '2026-10-16',
	stage: 'Job',
	publishedAt: null
};
assert.equal(isJobClosingSoon(unpublishedJob, mockNow), false, 'Unpublished job must be excluded');
console.log('✅ 6. Unpublished jobs are excluded');

// 7. A job with a missing or invalid closing date is excluded
const jobMissingDate = {
	id: 8,
	title: 'Missing Date Job',
	last_date: null,
	stage: 'Job',
	publishedAt: '2026-10-01'
};
const jobUndefinedDate = {
	id: 9,
	title: 'Undefined Date Job',
	stage: 'Job',
	publishedAt: '2026-10-01'
};
const jobInvalidDate = {
	id: 10,
	title: 'Invalid Date Job',
	last_date: 'invalid-date-string',
	stage: 'Job',
	publishedAt: '2026-10-01'
};
const jobImpossibleDate = {
	id: 11,
	title: 'Impossible Date Job',
	last_date: '2026-02-31',
	stage: 'Job',
	publishedAt: '2026-10-01'
};
assert.equal(isJobClosingSoon(jobMissingDate, mockNow), false, 'Missing date job must be excluded');
assert.equal(
	isJobClosingSoon(jobUndefinedDate, mockNow),
	false,
	'Undefined date job must be excluded'
);
assert.equal(isJobClosingSoon(jobInvalidDate, mockNow), false, 'Invalid date job must be excluded');
assert.equal(
	isJobClosingSoon(jobImpossibleDate, mockNow),
	false,
	'Impossible date job must be excluded'
);
console.log('✅ 7. Missing and invalid dates are excluded');

// Non-job stage exclusion (e.g. Admit Card or Result)
const admitCardClosingSoon = {
	id: 12,
	title: 'Admit Card Item',
	last_date: '2026-10-15',
	stage: 'Admit Card',
	publishedAt: '2026-10-01'
};
assert.equal(
	isJobClosingSoon(admitCardClosingSoon, mockNow),
	false,
	'Non-job posts must be excluded'
);
console.log('✅ Non-job stage posts are excluded');

// 8. Jobs are ordered by their nearest closing deadline
const unorderedJobs = [
	{
		id: 103,
		title: 'Closes in 5 days',
		last_date: '2026-10-19',
		stage: 'Job',
		publishedAt: '2026-10-01'
	},
	{
		id: 101,
		title: 'Closes today',
		last_date: '2026-10-14',
		stage: 'Job',
		publishedAt: '2026-10-01'
	},
	{
		id: 104,
		title: 'Closes in 7 days',
		last_date: '2026-10-21',
		stage: 'Job',
		publishedAt: '2026-10-01'
	},
	{
		id: 102,
		title: 'Closes in 2 days',
		last_date: '2026-10-16',
		stage: 'Job',
		publishedAt: '2026-10-01'
	}
];
const sorted = sortJobsByClosingSoon(unorderedJobs, mockNow);
assert.equal(sorted[0].id, 101, 'Earliest closing job should be first');
assert.equal(sorted[1].id, 102, 'Second earliest closing job should be second');
assert.equal(sorted[2].id, 103, 'Third earliest closing job should be third');
assert.equal(sorted[3].id, 104, 'Latest closing job within window should be last');
console.log('✅ 8. Jobs are ordered by nearest closing deadline first');

// De-duplication check
const duplicateList = [
	{ id: 201, title: 'Job Alpha', last_date: '2026-10-15', stage: 'Job', publishedAt: '2026-10-01' },
	{
		id: 201,
		title: 'Job Alpha Duplicate',
		last_date: '2026-10-15',
		stage: 'Job',
		publishedAt: '2026-10-01'
	},
	{ id: 202, title: 'Job Beta', last_date: '2026-10-16', stage: 'Job', publishedAt: '2026-10-01' }
];
const deduped = deduplicateJobs(duplicateList);
assert.equal(deduped.length, 2, 'Duplicate IDs should be removed');
console.log('✅ Duplicate job entries are prevented');

// Date Range generator check
const range = getClosingSoonDateRange(mockNow);
assert.equal(range.todayStr, '2026-10-14', 'todayStr must be 2026-10-14');
assert.equal(range.endDateStr, '2026-10-21', 'endDateStr must be 2026-10-21');
console.log('✅ Date range correctly calculates today and +7 days');

console.log('🎉 ALL UNIT TESTS PASSED SUCCESSFULLY!');
