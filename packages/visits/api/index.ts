import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'
import { h } from 'preact'
import render from 'preact-render-to-string'

import { Classic } from '../components/Classic/Classic'
import { SAField, type SAJsonResponse } from '../helper/SimpleAnalytics'

/**
 * Send view to SimpleAnalytics.
 *
 * @see https://docs.simpleanalytics.com/server-side-tracking
 */
async function sendView(request: VercelRequest) {
	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	return await fetch('https://queue.simpleanalyticscdn.com/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			url: 'https://visits.github.marvin.digital/',
			ua: request.headers['user-agent'],
			referrer: request.headers.referer || 'direct',
			tz: process.env.TZ || '',
		}),
	})
}

/**
 * Get current analytics stats from SimpleAnalytics.
 *
 * @see https://docs.simpleanalytics.com/api/stats#query-parameters
 */
async function getAnalytics(): Promise<SAJsonResponse> {
	const fields = [SAField.PAGEVIEWS]
	const baseUri = 'https://simpleanalytics.com/visits.github.marvin.digital.json'
	const response = await fetch(
		`${baseUri}?version=5&info=false&fields=${fields.join(',')}`,
	)
	return (await response.json()) as SAJsonResponse
}

/**
 * Render and return SVG counter.
 */
export default async (request: VercelRequest, response: VercelResponse) => {
	const debug = 'debug' in request.query

	response.setHeader('Content-Type', 'image/svg+xml')
	response.setHeader('Cache-Control', 'public, max-age=0, stale-while-revalidate')

	let pageviews = 1234567890

	if (!debug) {
		await sendView(request)

		const analytics = await getAnalytics()
		pageviews = analytics.pageviews
	}

	const html = render(h(Classic, { pageviews }))

	return response.status(200).send(html)
}
