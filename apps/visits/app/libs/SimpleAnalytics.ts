import type { NextRequest } from 'next/server'

export enum SAField {
	PAGEVIEWS = 'pageviews',
	VISITORS = 'visitors',
	HISTOGRAM = 'histogram',
	PAGES = 'pages',
	COUNTRIES = 'countries',
	REFERRERS = 'referrers',
	UTM_SOURCES = 'utm_sources',
	UTM_MEDIUMS = 'utm_mediums',
	UTM_CAMPAIGNS = 'utm_campaigns',
	UTM_CONTENTS = 'utm_contents',
	UTM_TERMS = 'utm_terms',
	BROWSER_NAMES = 'browser_names',
	OS_NAMES = 'os_names',
	DEVICE_TYPES = 'device_types',
	SECONDS_ON_PAGE = 'seconds_on_page',
}

export interface SAJsonResponse {
	ok: boolean
	docs: string
	info: boolean
	hostname: string
	url: string
	path: string
	start: string
	end: string
	version: number
	timezone: string
	pageviews: number
	generated_in_ms: number
}

/**
 * Send view to SimpleAnalytics.
 *
 * @see https://docs.simpleanalytics.com/server-side-tracking
 */
export async function sendView(request: NextRequest) {
	return await fetch('https://queue.simpleanalyticscdn.com/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			url: 'https://visits.github.marvin.digital/',
			ua: request.headers.get('user-agent'),
			referrer:
				request.headers.get('referer') || request.headers.get('referrer') || 'direct',
			tz: process.env.TZ || '',
		}),
	})
}

/**
 * Get current analytics stats from SimpleAnalytics.
 *
 * @see https://docs.simpleanalytics.com/api/stats#query-parameters
 */
export async function getAnalytics(): Promise<SAJsonResponse> {
	const fields = [SAField.PAGEVIEWS]
	const baseUri = 'https://simpleanalytics.com/visits.github.marvin.digital.json'
	const response = await fetch(
		`${baseUri}?version=5&info=false&fields=${fields.join(',')}`,
	)
	return (await response.json()) as SAJsonResponse
}
