import type { NextRequest } from 'next/server'

const DEFAULT_SITE_URL = 'https://muuvmuuv.goatcounter.com'
// GoatCounter's stats endpoint defaults to "last week" — pass a far-past start
// to get the lifetime total.
const LIFETIME_START = '2010-01-01T00:00:00Z'

export interface AnalyticsTotals {
	pageviews: number
}

function getSiteUrl(): string {
	return process.env.GOATCOUNTER_SITE_URL || DEFAULT_SITE_URL
}

function getToken(): string {
	const token = process.env.GOATCOUNTER_TOKEN
	if (!token) throw new Error('GOATCOUNTER_TOKEN is not set')
	return token
}

/**
 * Send a hit to GoatCounter via the /api/v0/count endpoint.
 *
 * `no_sessions: true` is intentional: all requests reach us through GitHub's
 * camo image proxy, which means every visitor shares the same IP and UA.
 * Without this flag, GoatCounter would collapse them into one daily session.
 */
export async function sendView(request: NextRequest): Promise<void> {
	const referrer =
		request.headers.get('referer') || request.headers.get('referrer') || ''

	const response = await fetch(`${getSiteUrl()}/api/v0/count`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify({
			no_sessions: true,
			hits: [{ path: '/', ref: referrer }],
		}),
	})

	if (!response.ok) {
		throw new Error(
			`GoatCounter count failed (${response.status}): ${await response.text()}`,
		)
	}
}

/**
 * Get lifetime totals via /api/v0/stats/total.
 */
export async function getAnalytics(): Promise<AnalyticsTotals> {
	const url = `${getSiteUrl()}/api/v0/stats/total?start=${LIFETIME_START}`
	const response = await fetch(url, {
		headers: { Authorization: `Bearer ${getToken()}` },
	})

	if (!response.ok) {
		throw new Error(
			`GoatCounter stats failed (${response.status}): ${await response.text()}`,
		)
	}

	const data = (await response.json()) as { total: number }
	return { pageviews: data.total }
}
