import type { NextRequest } from 'next/server'

const HOSTNAME = 'visits.github.marvin.digital'

const TRACK_HOST = process.env.UMAMI_HOST || 'https://cloud.umami.is'
const API_HOST = process.env.UMAMI_API_HOST || 'https://api.umami.is'

export interface UmamiStatsMetric {
	value: number
	prev: number
}

export interface UmamiStatsResponse {
	pageviews: UmamiStatsMetric
	visitors: UmamiStatsMetric
	visits: UmamiStatsMetric
	bounces: UmamiStatsMetric
	totaltime: UmamiStatsMetric
}

/**
 * Send view to Umami.
 *
 * @see https://umami.is/docs/sending-stats
 */
export async function sendView(request: NextRequest) {
	const websiteId = process.env.UMAMI_WEBSITE_ID
	if (!websiteId) throw new Error('UMAMI_WEBSITE_ID is not set')

	return await fetch(`${TRACK_HOST}/api/send`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0',
			'X-Forwarded-For':
				request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
		},
		body: JSON.stringify({
			type: 'event',
			payload: {
				website: websiteId,
				hostname: HOSTNAME,
				url: '/',
				referrer: request.headers.get('referer') || request.headers.get('referrer') || '',
				name: 'pageview',
			},
		}),
	})
}

/**
 * Get current analytics stats from Umami.
 *
 * @see https://umami.is/docs/api/website-stats
 */
export async function getAnalytics(): Promise<UmamiStatsResponse> {
	const websiteId = process.env.UMAMI_WEBSITE_ID
	const apiKey = process.env.UMAMI_KEY
	if (!websiteId) throw new Error('UMAMI_WEBSITE_ID is not set')
	if (!apiKey) throw new Error('UMAMI_KEY is not set')

	const params = new URLSearchParams({
		startAt: '0',
		endAt: String(Date.now()),
	})

	const response = await fetch(`${API_HOST}/api/websites/${websiteId}/stats?${params}`, {
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
	})

	return (await response.json()) as UmamiStatsResponse
}
