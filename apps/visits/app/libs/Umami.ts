import { getClient } from '@umami/api-client'
import umami from '@umami/node'
import type { NextRequest } from 'next/server'

const HOSTNAME = 'visits.github.marvin.digital'
const DEFAULT_HOST_URL = 'https://cloud.umami.is'
const DEFAULT_API_ENDPOINT = 'https://api.umami.is/v1'

export interface AnalyticsTotals {
	pageviews: number
	visitors: number
	visits: number
	bounces: number
	totaltime: number
}

let initialized = false

function ensureInit() {
	if (initialized) return
	const websiteId = process.env.UMAMI_WEBSITE_ID
	if (!websiteId) throw new Error('UMAMI_WEBSITE_ID is not set')
	umami.init({
		websiteId,
		hostUrl: process.env.UMAMI_HOST_URL || DEFAULT_HOST_URL,
	})
	initialized = true
}

/**
 * Send view to Umami via the official @umami/node client.
 */
export async function sendView(request: NextRequest) {
	ensureInit()
	return await umami.track({
		url: '/',
		hostname: HOSTNAME,
		referrer: request.headers.get('referer') || request.headers.get('referrer') || '',
	})
}

/**
 * Get total stats via @umami/api-client.
 *
 * The client's response types reflect the legacy /api endpoint shape
 * ({ value, prev }), but the v1 Cloud endpoint returns plain numbers — so we
 * normalize both shapes here.
 */
export async function getAnalytics(): Promise<AnalyticsTotals> {
	const websiteId = process.env.UMAMI_WEBSITE_ID
	if (!websiteId) throw new Error('UMAMI_WEBSITE_ID is not set')

	const client = getClient({
		apiEndpoint: process.env.UMAMI_API_CLIENT_ENDPOINT || DEFAULT_API_ENDPOINT,
		apiKey: process.env.UMAMI_API_KEY,
	})

	const { ok, data, error, status } = await client.getWebsiteStats(websiteId, {
		startAt: 0,
		endAt: Date.now(),
	})

	if (!ok || !data) {
		throw new Error(`Umami stats request failed (${status}): ${JSON.stringify(error)}`)
	}

	const num = (v: unknown): number =>
		typeof v === 'number' ? v : ((v as { value?: number })?.value ?? 0)

	return {
		pageviews: num(data.pageviews),
		visitors: num(data.visitors),
		visits: num(data.visits),
		bounces: num(data.bounces),
		totaltime: num(data.totaltime),
	}
}
