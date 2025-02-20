import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'
import { type FunctionComponent, h } from 'preact'
import { renderToString } from 'preact-render-to-string'

import { Classic } from '@/components/Classic/Classic.js'
import type { ClockProperties } from '@/components/Clock.js'
import { Cyber } from '@/components/Cyber/Cyber.js'
import { Flip } from '@/components/Flip/Flip.js'
import { SAField, type SAJsonResponse } from '@/libs/SimpleAnalytics.js'

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
	response.setHeader('Content-Type', 'image/svg+xml')
	response.setHeader('Cache-Control', 'public, max-age=0, stale-while-revalidate')

	const debug = 'debug' in request.query

	const themeName = 'theme' in request.query ? request.query.theme.toString() : 'classic'
	const themeComponents: Record<string, FunctionComponent<ClockProperties>> = {
		classic: Classic,
		cyber: Cyber,
		flip: Flip,
	}
	const ThemeComponent = themeComponents[themeName]

	let pageviews = 1234567890

	if (!debug) {
		await sendView(request)

		const analytics = await getAnalytics()
		pageviews = analytics.pageviews
	}

	const html = renderToString(h(ThemeComponent, { pageviews }))

	return response.status(200).send(html)
}
